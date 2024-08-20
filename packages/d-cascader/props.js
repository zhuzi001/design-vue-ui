function dFunc (type, value) {
  return {
    type,
    default: value
  }
}
export default {
  options: dFunc(Array, () => []),
  needValue: dFunc(Array, () => []),
  placeholder: dFunc(String, '请选择'),
  labelInValue: dFunc(Boolean, false),
  maxTagCount: dFunc(Number, 4)
}
