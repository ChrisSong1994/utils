export function rafTimeout(callback: () => void, delay: number = 0) {
  let requestId;
  const start = performance.now();
  function tick(currentTime: DOMHighResTimeStamp) {
    const elapsed = currentTime - start;

    if (elapsed >= delay) {
      callback();
    } else {
      requestId = requestAnimationFrame(tick);
    }
  }

  requestId = requestAnimationFrame(tick);

  // 返回取消函数
  return {
    clear: () => cancelAnimationFrame(requestId),
  };
}
