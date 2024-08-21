/**
 * 深度合并json
 * @param {*} target
 * @param {*} source
 * @returns 合并后的json数据
 */
export function deepMerge (target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]))
    }
  }
  Object.assign(target || {}, source)
  return target
}

/**
 *
 * @param {需要克隆的数据} obj  keyObj: key 变成 另一个key
 * @returns 新json
 */
export function deepClone (obj, keyObj) {
  const _keyObj = swapKeysAndValues(keyObj)
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => deepClone(v, keyObj))
  }

  const clonedObj = {}
  for (const key of Object.keys(obj)) {
    clonedObj[_keyObj[key] || key] = deepClone(obj[key], keyObj)
  }

  return clonedObj
}

/**
 *
 * @param {*} jsonObj json key与value互换
 * @returns
 */
function swapKeysAndValues (jsonObj) {
  const swappedObj = {}
  for (const key in jsonObj) {
    if (Object.prototype.hasOwnProperty.call(jsonObj, key)) { // 确保是对象自有属性
      swappedObj[jsonObj[key]] = key
    }
  }
  return swappedObj
}
