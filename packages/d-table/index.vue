<template>
  <!-- 全局table-带查询 -->
  <div class="xm_global_table">
    <!-- 表格 -->
    <div class="table-wrap">
      <div class="header-wrap">
        <div class="left">
          <slot name="headerLeft"></slot>
        </div>
        <div class="setting-icon">
          <table-set
            v-if="columns && columnSet.showTableSet"
            :columns="columns"
            :isCache="columnSet.isCache || false"
            :suffix="columnSet.suffix || ''"
            @change="(value) => $emit('setColumns', value)"
          />
        </div>
      </div>
      <a-table
        :columns="columns"
        :pagination="false"
        :rowKey="rowKey"
        :transformCellText="({ text }) => (!text && text !== 0 ? '--' : text)"
        v-bind="$attrs"
        ref="tableRef"
      >
        <span slot="c-index" slot-scope="text, record, index">
          {{ index | indexFilter(pag) }}
        </span>
        <template
          v-for="column in tableSlots"
          :slot="column.scopedSlots.customRender"
          slot-scope="text, record"
        >
          <d-tooltip
            v-if="column.scopedSlots.customRender.indexOf('c-tip') !== -1"
            :content="text"
            v-bind="column.scopedSlots.config || {}"
            :key="column.dataindex || column.key"
          />
          <a-badge
            :key="column.dataIndex || column.key"
            :status="text | statusFilter(column.scopedSlots.status)"
            :text="
              column.scopedSlots.des
                ? record[column.scopedSlots.des]
                : text | txtFilter(column.scopedSlots.txt)
            "
            v-bind="column.scopedSlots.config || {}"
            v-else-if="
              column.scopedSlots.customRender.indexOf('c-badge') !== -1
            "
          />
        </template>
        <template
          v-for="item in scopedSlots.filter((v) => v.type === 'customRender')"
          :slot="item.key"
          slot-scope="text, record, index"
        >
          <slot :name="item.key" :text="text" :record="record" :index="index">
          </slot>
        </template>
        <template
          v-for="item in scopedSlots.filter((v) => v.type !== 'customRender')"
          :slot="item.key"
        >
          <slot :name="item.key">
          </slot>
        </template>

      </a-table>
    </div>
    <!-- 分页 -->
    <div class="xm_table_pagination" v-if="showPag">
      <a-pagination
        show-quick-jumper
        show-size-changer
        :show-total="(total) => `共 ${total} 条`"
        :total="pag.total"
        :current="pag.page"
        :pageSize="pag.page_size"
        @showSizeChange="changeSize"
        @change="changeSize"
      />
    </div>
  </div>
</template>

<script>
import DTooltip from '../d-tooltip/index.vue'
import TableSet from './set.vue'
import props from './config/prop'
import { Table, Pagination, Badge } from 'ant-design-vue'
const BadgeStatus = {
  1: 'success',
  0: 'error',
  default: 'error'
}

const DefaultShowStatus = {
  1: '已启用',
  0: '已停用',
  '-1': '已禁用',
  default: '未知'
}
export default {
  name: 'DTable',
  props,
  components: {
    TableSet,
    DTooltip,
    ATable: Table,
    APagination: Pagination,
    ABadge: Badge
  },
  data () {
    return {
      selectedRowKeys: [], // 已选择的key
      tableSlots: [],
      scopedSlots: [],
      columnsCopy: []
    }
  },
  created () {
    this.initColumns()
    this.getSlots(this.columns)
  },
  mounted () {
    this.initScopedSlots()
  },
  filters: {
    valueFilter (val, emptyTxt) {
      // console.log(val, !val && val !== 0, emptyTxt)
      if (!val && val !== 0) return emptyTxt
      return val
    },
    statusFilter (val, statusObj) {
      if (!statusObj) return BadgeStatus[val] || BadgeStatus.default || ''
      return statusObj[val] || statusObj.default || ''
    },
    txtFilter (val, txtObj) {
      if (!txtObj) return DefaultShowStatus[val] || DefaultShowStatus.default
      return txtObj[val] || txtObj.default || val
    },
    indexFilter (index, pag) {
      return pag.page > 1
        ? index + 1 + (pag.page - 1) * pag.page_size
        : index + 1
    }

  },
  updated () {},
  methods: {
    initScopedSlots () {
      // 获取 外面组件的slot集合
      const _scopedSlots = this.$scopedSlots
      // console.log(this, this.$slots, this.$refs.tableRef)
      for (const key in _scopedSlots) {
        if (Object.prototype.hasOwnProperty.call(_scopedSlots, key)) {
          this.scopedSlots.push({
            key: key,
            type: this.getScopedSlotsType(key)
          })
        }
      }
    },
    getScopedSlotsType (key) {
      let _type = ''
      this.columns.some(v => {
        const _slot = this.findKeyByValue(v.slots, key)
        const _scopeSlot = this.findKeyByValue(v.scopedSlots, key)
        _type = _slot || _scopeSlot
        return _type
      })
      return _type
    },
    findKeyByValue (obj, value) {
      if (!obj) return undefined
      // 使用 Object.entries 将对象转换为 [key, value] 数组
      const entry = Object.entries(obj).find(([key, val]) => val === value)
      // 如果找到匹配的条目，则返回对应的键，否则返回 undefined
      return entry ? entry[0] : undefined
    },
    getSlots (val) {
      const _cRender = ['c-tip', 'c-badge']
      this.tableSlots = val.filter((v) => {
        const isExist = _cRender.some(q => v.scopedSlots?.customRender.indexOf(q) !== -1)
        return (
          v.scopedSlots?.customRender &&
          isExist
        )
      })
    },
    initColumns () {
      // 处理 tip status
      const _cRender = ['c-tip', 'c-badge']
      this.columns.forEach((item, index) => {
        if (
          item.scopedSlots &&
          _cRender.indexOf(item.scopedSlots?.customRender) !== -1
        ) {
          item.scopedSlots.customRender = item.scopedSlots.customRender + index
        }
      })
      this.columnsCopy = [...this.columns]
    },
    // 页码改变
    changeSize (page, pageSize) {
      // this.pag.page = page
      // this.pag.page_size = pageSize
      this.$nextTick(() => {
        this.$emit('changeSize', page, pageSize)
      })
    },
    // 切换table多选
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('onSelectChange', selectedRowKeys)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("./style/index.less");
</style>
