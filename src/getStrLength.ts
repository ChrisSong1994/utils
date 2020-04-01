/**
 * 统计字数，英文算1个，中文算2个
 * @param  {string} str [description]
 * @return {number}     [description]
 */
const getStrLength = (str: string): number => {
  if (typeof str !== 'string') {
    return 0
  }
  let length: number = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      length++
    } else {
      length += 2
    }
  }
  return length
}

export default getStrLength
