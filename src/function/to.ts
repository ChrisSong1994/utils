/**
 * promise 结果转数组
 */
export function to(promise: Promise<any>): Promise<[any, any]> {
  return new Promise((resolve) => {
    promise.then(
      (res) => resolve([res, null]),
      (err) => resolve([null, err])
    );
  });
}
