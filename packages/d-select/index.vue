<template>
  <a-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="selectValue"
    :filterOption="()=>true"
    style="width: 100%"
    @change="selectChange"
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
      type: [String, Number, Array],
      default: ''
    },
    // filterOption: {
    //   type: Function
    // },
    fieldNames: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value', children: 'children' }
      }
    }
  },
  watch: {
    value: {
      handler (v = undefined) {
        this.selectValue = !v && v !== 0 ? undefined : v
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

      return (this.options || []).filter(filterBySearch)
    }

  },
  methods: {
    filterOptions () {
      if (this.pag) return this.pagFilterOptions()
    },
    selectSearch (value) {
      this.searchValue = value
      this.pag && this.pagSearch(value)
      this.$emit('search', value)
    },
    selectChange (v) {
      this.$emit('change', v)
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
