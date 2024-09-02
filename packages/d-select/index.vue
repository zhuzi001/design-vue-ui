<template>
  <a-select
    v-bind="$attrs"
    :value="selectValue"
    :filterOption="() => true"
    style="width: 100%"
    @change="selectChange"
    labelInValue
    dropdownClassName="xm_select"
    @search="selectSearch"
    @focus="onFocus"
    @popupScroll="popupScroll"
  >
    <template v-if="searchLoading">
      <a-select-option key="a-spin">
        <slot name="searchLoad">
          <a-spin />
        </slot>
      </a-select-option>
    </template>
    <template v-else-if="groups.length">
      <a-select-opt-group
        v-for="group in filterOptions"
        :key="group.key"
        :label="group.label"
      >
        <a-select-option
          v-for="option in group.options"
          :key="option[fieldNames.value]"
          :value="option[fieldNames.value]"
          :label="option[fieldNames.label]"
        >
          <slot name="label" :option="option">
            {{ option[fieldNames.label] }}
          </slot>
        </a-select-option>
        <a-select-option
          key="a-spin"
          v-if="!!loadData && resultOptions.length !== total"
        >
          <slot name="optionLoad">
            <a-spin />
          </slot>
        </a-select-option>
      </a-select-opt-group>
    </template>
    <template v-else>
      <a-select-option
        v-for="option in filterOptions"
        :key="option[fieldNames.value]"
        :value="option[fieldNames.value]"
        :label="option[fieldNames.label]"
      >
        <slot name="label" :option="option">
          {{ option[fieldNames.label] }}
        </slot>
      </a-select-option>
      <a-select-option
        key="a-spin"
        v-if="!!loadData && resultOptions.length !== total"
      >
        <slot name="optionLoad">
          <a-spin />
        </slot>
      </a-select-option>
    </template>

    <div slot="dropdownRender" slot-scope="menu">
      <v-nodes :vnodes="menu" />
      <template
        v-if="pagTotal && (pageType === 'pagination' || pageType === 'paginationRemote')"
      >
        <a-divider class="xm_divider" />
        <div class="xm_pag_box" @mousedown="(e) => e.preventDefault()">
          <a-pagination
            size="small"
            v-bind="pagBind"
            :total="pagTotal"
            @change="pagChange"
          />
        </div>
      </template>
    </div>
    <!-- 使用 v-for 循环渲染插槽内容 -->
    <template v-for="(item, key) in $slots" #[key]>
      <!-- {{key}} -->
      <slot :name="key"></slot>
    </template>
  </a-select>
</template>

<script>
import pagMixin from './pagMixin'
export default {
  name: 'DSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [pagMixin],
  components: {
    VNodes: {
      functional: true,
      render: (_, ctx) => ctx.props.vnodes
    }
  },
  data () {
    return {
      selectValue: undefined,
      searchValue: undefined
    }
  },
  props: {
    loadData: {
      type: Function,
      default: null
    },
    searchLoading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    groups: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array, Object]
    },
    fieldNames: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value', children: 'children' }
      }
    },
    labelInValue: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler (v = undefined) {
        const _vIsArr =
          Array.isArray(v) && v.filter((value) => value !== undefined)?.length
        if (!v && v !== 0) this.selectValue = undefined
        else if (Array.isArray(v) && !_vIsArr) this.selectValue = []
        // 判断是 label + value 不，不是的话需要去数组匹配好（因为我们是分页或滚动加载的，要不会value）
        else if (!this.labelInValue) {
          // 做哈判断
          const isArr = Array.isArray(v)
          if (!isArr) {
            this.selectValue = this.getValue([v]) // 不是数组，直接改变成数组
          } else if (
            !this.selectValue ||
            !this.arraysEqual(
              v,
              this.selectValue.map((j) => j.key)
            )
          ) {
            this.selectValue = this.getValue(v, true)
          }
        } else this.selectValue = v
        // this.selectValue = !v && v !== 0 ? undefined : v
      },
      immediate: true
    }
  },
  computed: {
    resultOptions () {
      const searchValue = this.searchValue
      const prop = this.$attrs.optionFilterProp || 'value'
      const filterProp = this.fieldNames[prop]

      if (!searchValue) {
        return this.groups.length ? this.groups : this.options || []
      }

      const filterBySearch = (item, key) =>
        item[key || filterProp].toString().includes(searchValue)

      if (this.groups.length) {
        return this.groups
          .map((group) => {
            // 过滤 group 的 options
            const filteredOptions = group.options
              ? group.options.filter((option) => filterBySearch(option))
              : []

            // 仅返回有匹配 options 的 group
            if (filteredOptions.length > 0 || filterBySearch(group, 'label')) {
              return {
                ...group,
                options: filteredOptions
              }
            }

            return null
          })
          .filter((group) => group !== null) // 去掉 null 值
      }

      return (this.options || []).filter((v) => filterBySearch(v))
    },
    filterOptions () {
      if (this.pageType) return this.pagFilterOptions()
      return this.resultOptions
    }
  },
  methods: {
    arraysEqual (arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false
      }
      const set1 = new Set(arr1)
      const set2 = new Set(arr2)
      return (
        set1.size === set2.size && [...set1].every((item) => set2.has(item))
      )
    },
    getValue (data, isArr) {
      const { value: _value = 'value', label: _label = 'label' } =
        this.fieldNames || {}
      const filterData = (options) =>
        options
          .filter((item) => data.includes(item[_value]))
          .map((item) => ({ label: item[_label], key: item[_value] }))

      const filterResult = this.groups.length
        ? this.groups.flatMap((group) => filterData(group.options || []))
        : filterData(this.options)
      const result = data.map((v) => {
        const _filterV = filterResult.filter((j) => j.label === v)
        if (_filterV?.length) return _filterV[0]
        return {
          label: v,
          key: v
        }
      })
      return isArr ? result : result[0]
    },
    selectSearch (value) {
      if (!this.loadData) this.searchValue = value
      this.pagSearch && this.pagSearch()
      this.$emit('search', value)
    },
    selectChange (v) {
      this.selectValue = v
      const isArr = Array.isArray(v)
      console.log(this.labelInValue, 'this.$attrs.labelInValue')
      const _v = this.labelInValue ? v : !isArr ? v.key : v.map((j) => j.key)
      console.log(_v)
      this.$emit('change', _v)
    },
    onFocus () {
      this.searchValue = undefined
      this.$emit('focus')
    },
    popupScroll (e) {
      this.handlePagScroll && this.handlePagScroll(e)
      this.$emit('popupScroll', e)
    }
  }
}
</script>
<style lang="less" scoped>
.xm_select {
  background: red;
  .xm_divider {
    margin: 12px 0;
  }
  .xm_pag_box {
    padding: 0 12px;
    padding-bottom: 8px;
  }
}
</style>
