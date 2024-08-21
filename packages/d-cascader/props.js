function dFunc (type, value) {
  return {
    type,
    default: value
  }
}
export default {
  showSelectAll: dFunc(Boolean, false), // 显示全选
  options: dFunc(Array, () => []),
  needValue: dFunc(Array, () => []),
  placeholder: dFunc(String, '请选择'),
  labelInValue: dFunc(Boolean, false),
  maxTagCount: dFunc(Number, 4),
  fieldNames: dFunc(Object, () => {
    return { label: 'label', value: 'value', children: 'children' }
  }), // 自定义 options 中 label name children 的字段
  showCheckedChild: dFunc(Boolean, false) // 定义选中项回填的方式。 true: 只显示选中的子节点 false: 只显示父节点（当父节点下所有子节点都选中时）
}
