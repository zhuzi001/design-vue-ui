export const defaultSlotConfig = {
  tip: {
    len: 12
  }
}
export default {
  // 通用 列表设置 --- 自定义列表需要的属性
  columnSet: {
    type: Object,
    default: () => {
      return {
        showTableSet: true,
        isCache: false, // 是否需要缓存
        suffix: '' // 前缀   一个页面多个列表的时候 需要缓存的时候很有必要
      }
    }
  },
  isHideOnSinglePage: {
    // 设置当前总数小于设置页数 是否显示分页
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    default: []
  },
  rowKey: {
    // 单个rowKey
    type: String,
    default: 'id'
  },
  pag: {
    type: Object,
    default: () => {
      return {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  showPag: {
    type: Boolean,
    default: true
  }
}
