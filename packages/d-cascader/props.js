function dFunc (type, value) {
  return {
    type,
    default: value
  }
}
export default {
  loadData: dFunc(Function, null),
  allowResize: dFunc(Boolean, false), // 是否允许监听resize变化  默认不监听
  displayRender: dFunc(Function | null, null), // 默认是 {label:**,key: ***}
  showSelectAll: dFunc(Boolean, false), // 显示全选
  options: dFunc(Array, () => []),
  value: dFunc(Array, () => []),
  placeholder: dFunc(String, '请选择'),
  labelInValue: dFunc(Boolean, false),
  maxTagCount: dFunc(Number, 4),
  allText: dFunc(String, '全选'),
  noDataContent: dFunc(String, '暂无数据'),
  fieldNames: dFunc(Object, () => {
    return { }
  }), // 自定义 options 中 label name children 的字段
  showCheckedChild: dFunc(Boolean, false) // 定义选中项回填的方式。 true: 只显示选中的子节点 false: 只显示父节点（当父节点下所有子节点都选中时）
}
