<template>
  <a-select
    v-bind="$attrs"
    :value="selectValue"
    :filterOption="()=>true"
    style="width: 100%"
    @change="selectChange"
    labelInValue
    dropdownClassName="xm_select"
    @search="selectSearch"
    @focus="onFocus"
  >
    <template v-if="groups.length">
      <a-select-opt-group
        v-for="group in filterOptions()"
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
      </a-select-opt-group>
    </template>
    <template v-else>
      <a-select-option
        v-for="option in filterOptions()"
        :key="option[fieldNames.value]"
          :value="option[fieldNames.value]"
          :label="option[fieldNames.label]"
      >
        <slot name="label" :option="option">
           {{ option[fieldNames.label] }}
        </slot>
      </a-select-option>
    </template>

    <div slot="dropdownRender" slot-scope="menu">
      <v-nodes :vnodes="menu" />
      <template v-if="pag">
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
      handler (v = undefined, qw) {
        if (!v && v !== 0) this.selectValue = undefined
        // 判断是 label + value 不，不是的话需要去数组匹配好（因为我们是分页或滚动加载的，要不会value）
        else if (!this.labelInValue) {
          // 做哈判断
          const isArr = Array.isArray(v)
          if (!isArr) this.selectValue = this.getValue([v]) // 不是数组，直接改变成数组
          else if (!this.selectValue || !this.arraysEqual(v, this.selectValue.map(j => j.key))) { this.selectValue = this.getValue(v) }
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

      const filterBySearch = (item, key) => item[key || filterProp].toString().includes(searchValue)

      if (this.groups.length) {
        return this.groups
          .map(group => {
            // 过滤 group 的 options
            const filteredOptions = group.options
              ? group.options.filter(option => filterBySearch(option))
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
          .filter(group => group !== null) // 去掉 null 值
      }

      return (this.options || []).filter(v => filterBySearch(v))
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
    getValue (data) {
      const _value = this.fieldNames?.value || 'value'
      const _label = this.fieldNames?.label || 'label'
      return this.resultOptions.filter(v => data.indexOf(v[_value]) !== -1).map(v => {
        return {
          label: v[_label],
          key: v[_value]
        }
      })
    },
    filterOptions () {
      if (this.pag) return this.pagFilterOptions()
      return this.resultOptions
    },
    selectSearch (value) {
      this.searchValue = value
      this.pag && this.pagSearch(value)
      this.$emit('search', value)
    },
    selectChange (v) {
      this.selectValue = v
      const isArr = Array.isArray(v)
      console.log(this.labelInValue, 'this.$attrs.labelInValue')
      const _v = this.labelInValue ? v : !isArr ? v.key : v.map(j => j.key)

      this.$emit('change', _v)
    },
    onFocus () {
      this.searchValue = undefined
      this.$emit('focus')
    }
  }
}
</script>
<style lang="less" scoped>
.xm_select {
  background: red;
  .xm_divider {
    margin: 12px;
  }
  .xm_pag_box {
    padding: 0 12px;
    padding-bottom: 8px;
  }
}
</style>
