<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>基本使用</h2>
       <!-- <d-select
        placeholder="请选择"
      />
      <d-select
        placeholder="请选择"
        :options="options"
      />
      <d-select
        placeholder="请选择"
        :groups="groups"
        :filterOption="filterFunction"
      />
      <h2>自定义</h2>
      <d-select
        placeholder="请选择"
        :options="options"
      >
      <template #label="{option}">
        {{option.label}}{{option.value}}
      </template>
      </d-select> -->
       <h2>分页</h2>
      <d-select
        placeholder="请选择"
        :options="options"
        showSearch
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        optionFilterProp="label"
        :pag="{
          current: 1,
          pageSize: 10,
          showTotal:(total) => `共 ${total} 条`
        }"
      >
      </d-select>

       <d-select
        placeholder="请选择"
        :groups="groups"
        showSearch
        :fieldNames="{ label: 'region_name', value: 'region_code', children: 'areaList' }"
        optionFilterProp="label"
        :pag="{
          current: 1,
          pageSize: 1,
          showTotal:(total) => `共 ${total} 组`
        }"
      >
      </d-select>

      <a-select showSearch default-value="lucy" style="width: 120px" optionFilterProp="children">
      <a-select-option value="jack">
        222
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="disabled" disabled>
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
    </a-space>
  </div>
</template>

<script>
import allRegion from '../json/allRegion.json'
import region from '../json/region.json'
export default {
  data () {
    return {
      selectedValue: null,
      options: allRegion,
      groups: [
        {
          label: 'Group 1',
          key: '234',
          options: allRegion.map(v => {
            return {
              region_name: v.name,
              region_code: v.code

            }
          })
        },
        { label: 'Group 2', key: '435', options: region.data }
      ]
    }
  },
  created () {
    // this.options = []
    // for (let index = 0; index < 50; index++) {
    //   this.options.push({
    //     value: index, label: 'Option ' + index
    //   })
    // }
  },
  methods: {
    filterFunction (option) {
      // 只显示 label 包含 '1' 的选项
      return option.label.includes('1')
    }
  }
}
</script>
