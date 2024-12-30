export type waterMarkOptions = {
  text: string;
  size?: [number, number];
  angle?: number; // 默认值为 -30
  globalAlpha?: number;
};

function waterMarkTime() {
  const d = new Date();
  const year = String(d.getFullYear()).slice(-2);
  const month = pad(d.getMonth() + 1);
  const date = pad(d.getDate());
  const hour = pad(d.getHours());
  const time = pad(d.getMinutes());

  return [year, month, date].join("-").concat(" ", [hour, time].join(":"));
}

// 不满2位长度补0
function pad(num: number | string): string {
  if (typeof num === "string") {
    num = parseInt(num, 10);
  }
  return num < 10 ? "0" + num : num.toString();
}

function createWaterMark(options: waterMarkOptions) {
  const [width, height] = options.size;
  const time = waterMarkTime();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const cx = width / 2;
  const cy = height / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#333";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.globalAlpha = 0.1;

  // 保存当前的绘图状态
  ctx.save();
  ctx.translate(cx, cy);
  // 旋转
  ctx.rotate((Math.PI / 180) * options.angle);
  // 平移回原点
  ctx.translate(-cx, -cy);
  ctx.fillText(options.text, width / 2.5, height / 2 - 20);
  ctx.fillText(time, width / 2.5, height / 2);

  return canvas.toDataURL("image/png");
}

/**
 * @typedef {object} waterMarkOptions
 * @property {string} text
 * @property {[number, number]} size
 * @property {number} angle
 */

function createWaterMarkInstance(options: waterMarkOptions) {
  const opt = Object.assign(options);
  const size = opt.size;

  const waterMarkImage = createWaterMark(opt);

  const el = document.createElement("div");
  el.id = "waterMark";
  setStyle(el);

  // 水印保护
  const mutationObserverConfig = {
    attributeFilter: ["style"],
    attributes: true,
    childList: true,
    subtree: true,
  };

  const mutationObserver = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        if (mutation.target === el) {
          setStyle(el);
          return;
        }
      }

      if (mutation.type === "childList") {
        mutation.removedNodes.forEach(function (removedNode) {
          if (removedNode === el) {
            document.body.appendChild(el);
          }
        });
      }
    });
  });

  mutationObserver.observe(document.body, mutationObserverConfig);

  function setStyle(element) {
    const [width, height] = size;

    element.style.position = "fixed";
    element.style.top = "0";
    element.style.bottom = "0";
    element.style.left = "0";
    element.style.right = "0";
    element.style.zIndex = "999";
    element.style.pointerEvents = "none";
    element.style.backgroundRepeat = "repeat";
    element.style.backgroundPosition = `0 0, 0 0`;

    el.style.backgroundPosition = `0 0, ${width / 2}px ${height / 2}px`;

    element.style.backgroundImage = `url(${waterMarkImage}), url(${waterMarkImage})`;
  }

  function render() {
    document.body.appendChild(el);
  }

  function destroy() {
    if (mutationObserver) {
      mutationObserver.disconnect();
      const div = document.getElementById("waterMark");
      if (div) document.body.removeChild(div);
    }
  }

  return {
    render,
    destroy,
  };
}

/**
 * 设置水印
 * 该函数用于在页面或元素中设置文本水印，通过创建水印实例并渲染来实现
 * 注意：需要获取dom树加载完毕后调用
 * @param options {object} - 水印配置项
 * @property options.markText {string} - 文本
 * @property options.size {Array<number, number>} - 尺寸，默认值[400, 200]
 * @property options.angle {number} - 旋转角度，默认值为 -30 度
 * @property options.platform {string} - 显示端，默认值为web，可选h5
 * @property options.globalAlpha {numer} - 透明度，默认值0.1，最大值1
 * @returns {Promise<{ destroy: () => void }>} - 返回一个包含销毁水印方法的对象
 */
export const setWaterMark = (options: waterMarkOptions) => {
  // 创建水印实例
  const waterMarkInstance = createWaterMarkInstance({
    text: options.text || "",
    size: options.size || [400, 200],
    angle: options.angle || -30,
    globalAlpha: options.globalAlpha || 0.1,
  });

  // 渲染水印
  waterMarkInstance.destroy();
  waterMarkInstance.render();
  return {
    destroy: waterMarkInstance.destroy,
  };
};
