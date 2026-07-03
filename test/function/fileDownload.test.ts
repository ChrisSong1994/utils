import { describe, expect, test, vi, beforeEach } from "vitest";

import { fileDownload } from "../../src";

// jsdom does not implement URL.createObjectURL / revokeObjectURL
URL.createObjectURL = vi.fn(() => "blob:mock-url");
URL.revokeObjectURL = vi.fn();

/**
 * Helper: create a Response with a ReadableStream body for fetch-mode tests.
 */
function createStreamResponse(
  data: string | Uint8Array = "test content",
  opts: { status?: number; headers?: Record<string, string> } = {}
) {
  const content = typeof data === "string" ? new TextEncoder().encode(data) : data;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(content);
      controller.close();
    },
  });
  return new Response(stream, {
    status: opts.status ?? 200,
    headers: {
      "content-type": "text/plain",
      "content-length": String(content.length),
      ...opts.headers,
    },
  });
}

describe("fileDownload", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("link mode", () => {
    test("creates and clicks an anchor element", () => {
      const clickSpy = vi.fn();
      const origCreateElement = document.createElement.bind(document);
      vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
        const el = origCreateElement(tag, options);
        if (tag === "a") {
          vi.spyOn(el, "click").mockImplementation(clickSpy);
        }
        return el;
      });

      fileDownload("https://example.com/file.pdf");

      expect(clickSpy).toHaveBeenCalledTimes(1);
      vi.restoreAllMocks();
    });

    test("uses provided fileName as download attribute", () => {
      let anchor: HTMLAnchorElement | null = null;
      const origCreateElement = document.createElement.bind(document);
      vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
        const el = origCreateElement(tag, options);
        if (tag === "a") {
          anchor = el as HTMLAnchorElement;
          vi.spyOn(el, "click").mockImplementation(() => {});
        }
        return el;
      });

      fileDownload("https://example.com/file.pdf", { fileName: "custom.pdf" });

      expect(anchor!.download).toBe("custom.pdf");
      expect(anchor!.href).toBe("https://example.com/file.pdf");
      vi.restoreAllMocks();
    });

    test("extracts filename from URL when no fileName provided", () => {
      let anchor: HTMLAnchorElement | null = null;
      const origCreateElement = document.createElement.bind(document);
      vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
        const el = origCreateElement(tag, options);
        if (tag === "a") {
          anchor = el as HTMLAnchorElement;
          vi.spyOn(el, "click").mockImplementation(() => {});
        }
        return el;
      });

      fileDownload("https://example.com/path/to/report.pdf");

      expect(anchor!.download).toBe("report.pdf");
      vi.restoreAllMocks();
    });
  });

  describe("iframe mode", () => {
    test("creates a hidden iframe with the URL", () => {
      const origCreateElement = document.createElement.bind(document);
      const createdIframes: HTMLIFrameElement[] = [];
      vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
        const el = origCreateElement(tag, options);
        if (tag === "iframe") {
          createdIframes.push(el as HTMLIFrameElement);
        }
        return el;
      });

      fileDownload("https://example.com/file.pdf", { mode: "iframe" });

      expect(createdIframes.length).toBe(1);
      expect(createdIframes[0].src).toBe("https://example.com/file.pdf");
      expect(createdIframes[0].style.display).toBe("none");
      vi.restoreAllMocks();
    });
  });

  describe("fetch mode", () => {
    test("fetches blob and triggers download", async () => {
      const clickSpy = vi.fn();
      const origCreateElement = document.createElement.bind(document);
      global.fetch = vi.fn().mockResolvedValue(createStreamResponse("hello world"));
      vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
        const el = origCreateElement(tag, options);
        if (tag === "a") {
          vi.spyOn(el, "click").mockImplementation(clickSpy);
        }
        return el;
      });

      await fileDownload("https://example.com/file.txt", { mode: "fetch" });

      expect(fetch).toHaveBeenCalledWith("https://example.com/file.txt", expect.any(Object));
      expect(clickSpy).toHaveBeenCalledTimes(1);
      vi.restoreAllMocks();
    });

    test("calls onProgress callback", async () => {
      const content = new Uint8Array(1000);
      global.fetch = vi.fn().mockResolvedValue(createStreamResponse(content));

      const progressValues: number[] = [];
      await fileDownload("https://example.com/file.bin", {
        mode: "fetch",
        onProgress: (p) => progressValues.push(p),
      });

      expect(progressValues.length).toBeGreaterThan(0);
      expect(progressValues[progressValues.length - 1]).toBeCloseTo(1, 0);
      vi.restoreAllMocks();
    });

    test("throws on non-ok response", async () => {
      global.fetch = vi.fn().mockResolvedValue(createStreamResponse("", { status: 404 }));

      await expect(
        fileDownload("https://example.com/missing.pdf", { mode: "fetch" })
      ).rejects.toThrow("Download failed: HTTP 404");
      vi.restoreAllMocks();
    });
  });
});
