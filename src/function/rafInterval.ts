export function rafInterval(callback: () => void, delay: number = 0) {
  let startTime = performance.now();
  let accumulatedTime = 0;
  let requestId: number;

  function tick(currentTime: DOMHighResTimeStamp) {
    const deltaTime = currentTime - startTime;
    accumulatedTime += deltaTime;
    startTime = currentTime;

    if (accumulatedTime >= delay) {
      callback();
      accumulatedTime -= delay; // 防止时间漂移
    }

    requestId = requestAnimationFrame(tick);
  }
  requestId = requestAnimationFrame(tick);

  // 返回取消函数
  return {
    clear: () => cancelAnimationFrame(requestId),
  };
}
