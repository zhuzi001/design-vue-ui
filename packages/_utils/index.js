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
 * @param {需要克隆的数据} obj
 * @returns 新json
 */
export function deepClone (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  }

  const clonedObj = {}
  for (const key of Object.keys(obj)) {
    clonedObj[key] = deepClone(obj[key])
  }

  return clonedObj
}
