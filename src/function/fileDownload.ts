export interface FileDownloadOptions {
  /** 下载模式：link(默认)、fetch(blob下载)、iframe */
  mode?: "link" | "fetch" | "iframe";
  /** 文件名（link/fetch 模式有效） */
  fileName?: string;
  /** 进度回调 `0~1`（仅 fetch 模式） */
  onProgress?: (progress: number) => void;
  /** 请求头（仅 fetch 模式） */
  headers?: Record<string, string>;
  /** 请求超时毫秒（仅 fetch 模式，默认 60000） */
  timeout?: number;
}

function extractFileName(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const name = pathname.substring(pathname.lastIndexOf("/") + 1);
    return decodeURIComponent(name) || "download";
  } catch {
    return "download";
  }
}

/**
 * 通过 <a> 标签下载
 */
function downloadByLink(url: string, fileName?: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName || extractFileName(url);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 通过隐藏 iframe 下载
 */
function downloadByIframe(url: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 5000);
}

/**
 * 通过 fetch 下载 blob，兼容进度回调
 */
async function downloadByFetch(
  url: string,
  fileName?: string,
  onProgress?: (progress: number) => void,
  headers?: Record<string, string>,
  timeout: number = 60000
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    headers,
    signal: controller.signal,
  });

  clearTimeout(timer);

  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status}`);
  }

  const contentLength = response.headers.get("content-length");
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("ReadableStream not supported");
  }

  const chunks: Uint8Array[] = [];
  let received = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total && onProgress) {
      onProgress(Math.min(received / total, 1));
    }
  }

  const blob = new Blob(chunks as BlobPart[]);
  const blobUrl = URL.createObjectURL(blob);
  const name = fileName || extractFileName(url);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

/**
 * 文件下载，支持多种下载模式
 *
 * @example
 * // 默认 <a> 标签下载
 * fileDownload('https://example.com/file.pdf')
 *
 * // fetch blob 下载（支持进度回调）
 * fileDownload('https://example.com/file.pdf', {
 *   mode: 'fetch',
 *   fileName: 'myfile.pdf',
 *   onProgress: (p) => console.log(`${Math.round(p * 100)}%`),
 * })
 *
 * // iframe 下载
 * fileDownload('https://example.com/file.pdf', { mode: 'iframe' })
 */
export const fileDownload = async (url: string, options?: FileDownloadOptions) => {
  const { mode = "link", fileName, onProgress, headers, timeout } = options || {};

  switch (mode) {
    case "fetch":
      return downloadByFetch(url, fileName, onProgress, headers, timeout);
    case "iframe":
      return downloadByIframe(url);
    case "link":
    default:
      return downloadByLink(url, fileName);
  }
};
