<template>
  <a-select
    v-bind="$attrs"
    :value="selectValue"
    :filterOption="() => true"
    style="width: 100%"
    @change="selectChange"
    labelInValue
    :defaultActiveFirstOption="defaultActiveFirstOption"
    dropdownClassName="xm_select"
    @search="selectSearch"
    @focus="onFocus"
    @popupScroll="popupScroll"
    ref="selectRef"
    v-on="filteredListeners"
  >
    <template v-if="searchLoading">
      <a-select-option key="a-spin" disabled>
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
          :key="option[fieldNames.key || fieldNames.value]"
          v-bind="optionBinding(option)"
        >
          <slot name="children" :option="option">
            {{ option[fieldNames.label] }}
          </slot>
        </a-select-option>
        <a-select-option
          key="a-spin"
          disabled
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
        :key="option[fieldNames.key || fieldNames.value]"
        v-bind="optionBinding(option)"
      >
        <slot name="children" :option="option">
          {{ option[fieldNames.label] }}
        </slot>
      </a-select-option>
      <a-select-option
        key="a-spin"
        disabled
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
        v-if="
          pagTotal &&
          (pageType === 'pagination' || pageType === 'paginationRemote')
        "
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
import groupsMixin from './groupsMixin'
import optionsMixin from './optionsMixin'
import { Select, Pagination, Spin, Divider } from 'ant-design-vue'
export default {
  name: 'DSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [pagMixin, groupsMixin, optionsMixin],
  components: {
    VNodes: {
      functional: true,
      render: (_, ctx) => ctx.props.vnodes
    },
    ASelect: Select,
    ASelectOptGroup: Select.OptGroup,
    ASelectOption: Select.Option,
    APagination: Pagination,
    ASpin: Spin,
    ADivider: Divider
  },
  data () {
    return {
      selectValue: undefined,
      searchValue: undefined
    }
  },
  props: {
    defaultActiveFirstOption: {
      type: Boolean,
      default: false
    },
    searchLoading: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array, Object]
    },
    fieldNames: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value' }
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
        if (!v && v !== 0) {
          this.selectValue = undefined
          return
        }
        const isArr = Array.isArray(v) // 是否是数组
        const isArrHasValue =
          isArr && v.filter((value) => value !== undefined)?.length // 是否有值，这个主要是怕用户未定义，数组会自动 [undefined]
        if (isArr && !isArrHasValue) this.selectValue = []
        else if (!this.labelInValue) {
          this.selectValue = this.isGroups
            ? this.gHandleValue(v)
            : this.oHandleValue(v)
        } else this.selectValue = v
      },
      immediate: true
    }
  },
  computed: {
    filteredListeners () {
      const { search, change, focus, popupScroll, pagChange, ...otherEvents } =
        this.$listeners
      return otherEvents
    },
    isGroups () {
      return this.groups?.length
    },
    resultOptions () {
      const searchValue = this.searchValue
      const prop = this.$attrs.optionFilterProp || 'value'
      const filterProp = this.fieldNames[prop] || 'label'

      const filterBySearch = (item, key) =>
        item[key || filterProp].toString().includes(searchValue)

      if (this.isGroups) {
        return !searchValue
          ? this.gGetGroups()
          : this.gHandleOptions(filterBySearch)
      }

      return !searchValue
        ? this.oGetOptions()
        : this.oHandleOptions(filterBySearch)
    },
    filterOptions () {
      return this.pageType ? this.pagFilterOptions() : this.resultOptions
    }
  },
  methods: {
    optionBinding (option) {
      const { label, value, disabled, title } = this.fieldNames
      // 默认绑定 label 和 value
      const _option = {
        label: option[label],
        value: option[value],
        disabled: option[disabled] || option.disabled || false,
        title: option[title] || option.title || ''
      }
      return _option
    },
    // 给 optionsMixin 和 groupsMixin 使用的
    getValue (modelValue, callback) {
      if (!callback) {
        throw new Error('Callback function must be defined')
      }

      const isArray = Array.isArray(modelValue) // 是否是数组
      const selectedValues = !this.selectValue
        ? []
        : Array.isArray(this.selectValue)
          ? this.selectValue
          : [this.selectValue]
      const valuesArray = isArray ? modelValue : [modelValue] // 如果不是数组，将 gVal 转换为数组
      // 从 fieldNames 获取 value 和 label 的属性名
      const { value = 'value', label = 'label' } = this.fieldNames || {}
      // 过滤并映射数据的函数
      const filterOptions = (options) => {
        return options
          .filter((option) => valuesArray.includes(option[value]))
          .map((option) => ({ label: option[label], key: option[value] }))
      }
      // 获取过滤后的结果
      const filteredOptions = callback(filterOptions)
      // 生成结果
      const finalResult = valuesArray.map((valueItem) => {
        const matchedOption = filteredOptions.find(
          (option) => option.key === valueItem
        )
        const selectedMatch =
          !matchedOption &&
          selectedValues.find((option) => option.key === valueItem)

        return (
          matchedOption || selectedMatch || { label: valueItem, key: valueItem }
        )
      })

      return isArray ? finalResult : finalResult[0]
    },
    selectSearch (value) {
      if (!this.loadData) this.searchValue = value
      this.pagSearch && this.pagSearch() // 重置 页码
      this.$emit('search', value)
    },
    selectChange (v) {
      this.selectValue = v
      const isArr = Array.isArray(v)
      const _v = this.labelInValue ? v : !isArr ? v.key : v.map((j) => j.key)
      this.$emit('change', _v)
    },
    onFocus () {
      this.searchValue = undefined
      this.$emit('focus')
    },
    popupScroll (e) {
      this.handlePagScroll && this.handlePagScroll(e)
      this.$emit('popupScroll', e)
    },
    focus () {
      this.$refs.selectRef.focus()
    },
    blur () {
      this.$refs.selectRef.blur()
    }
  }
}
</script>
<style lang="less" scoped>
.xm_select {
  .xm_divider {
    margin: 12px 0;
  }
  .xm_pag_box {
    padding: 0 12px;
    padding-bottom: 8px;
  }
}
</style>
