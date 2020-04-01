/**格式化json 为html 字符串
 * @param {Object} obj 需要格式化的json
 * @returns {string} 返回格式化的html字符串
 */
const formatJson = (obj: Object): string => {
  const rep: string = '~'
  let jsonStr: string = JSON.stringify(obj, null, rep)
  let str: string = ''

  for (let i = 0; i < jsonStr.length; i++) {
    const text2 = jsonStr.charAt(i)
    if (i > 1) {
      const text = jsonStr.charAt(i - 1)
      if (rep !== text && rep === text2) {
        str += '<br/>'
      }
    }
    str += text2
  }

  jsonStr = ''
  for (let i = 0; i < str.length; i++) {
    const text = str.charAt(i)
    if (rep === text) {
      jsonStr += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    } else {
      jsonStr += text
    }
    if (i === str.length - 2) {
      jsonStr += '<br/>'
    }
  }
  return jsonStr
}

export default formatJson
