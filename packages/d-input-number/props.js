function dFunc (type, value) {
  return {
    type,
    default: value
  }
}
export default {
  controls: dFunc(Boolean, true), // 是否显示增减按钮
  placeholder: dFunc(String, ''),
  value: dFunc(Number | String, null),
  addonAfter: dFunc(String, ''),
  min: dFunc(Number, null),
  max: dFunc(Number, null),
  step: dFunc(Number | String, 1),
  defaultValue: dFunc(Number, null),
  precision: dFunc(Number, null),
  formatter: dFunc(Function, null) // 指定输入框展示值的格式
}
