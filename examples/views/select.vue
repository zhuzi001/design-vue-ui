<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>基本使用</h2>
      <d-select
        v-model="selectedValueStr"
        :options="options"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        placeholder="请选择"
      />
      <d-select
        v-model="selectedValueObj"
        labelInValue
        :options="options"
        @change="onChange"
        :fieldNames="{ label: 'name', value: 'code' }"
        placeholder="请选择"
      />
      <d-select
        v-model="selectedValueArr"
        :options="options"
        mode="multiple"
        @change="onChange"
        :fieldNames="{ label: 'name', value: 'code' }"
        placeholder="请选择"
      />
      <d-select
        v-model="selectedValueObjArr"
        labelInValue
        :options="options"
        mode="multiple"
        @change="onChange"
        :fieldNames="{ label: 'name', value: 'code' }"
        placeholder="请选择"
      />

      <h2>自定义</h2>
      <d-select
        placeholder="请选择--默认显示option"
        :options="options"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        v-model="selectedValueStr"
      >
        <template #label="{ option }">
          {{ option.name }}{{ option.code }}
        </template>
      </d-select>
      <d-select
        placeholder="请选择-- 显示是 value 值"
        :options="options"
        optionLabelProp="value"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        v-model="selectedValueStr"
      >
        <template #label="{ option }">
          {{ option.name }}{{ option.code }}
        </template>
      </d-select>
      <d-select
        placeholder="请选择-- 显示是 label 值"
        :options="options"
        optionLabelProp="label"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        v-model="selectedValueStr"
      >
        <template #label="{ option }">
          {{ option.name }}{{ option.code }}
        </template>
      </d-select>
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
          showTotal: (total) => `共 ${total} 条`,
        }"
      >
      </d-select>
      <d-select
        placeholder="请选择"
        mode="multiple"
        :options="options"
        showSearch
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        optionFilterProp="label"
        :pag="{
          current: 1,
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条`,
        }"
      >
      </d-select>
      <d-select
        placeholder="请选择(tags 模式)"
        mode="tags"
        :options="options"
        showSearch
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        optionFilterProp="label"
        :pag="{
          current: 1,
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条`,
        }"
      >
      </d-select>

      <d-select
        placeholder="请选择"
        :groups="groups"
        showSearch
        :fieldNames="{
          label: 'region_name',
          value: 'region_code',
          children: 'areaList',
        }"
        optionFilterProp="label"
        :pag="{
          current: 1,
          pageSize: 1,
          showTotal: (total) => `共 ${total} 组`,
        }"
      >
      </d-select>

      <h2>滚动加载</h2>
    </a-space>
  </div>
</template>

<script>
import allRegion from '../json/allRegion.json'
import region from '../json/region.json'
export default {
  data () {
    return {
      selectedValueArr: ['130000'],
      selectedValueStr: null,
      selectedValueObj: undefined,
      selectedValueObjArr: undefined,
      options: allRegion,
      groups: [
        {
          label: 'Group 1',
          key: '234',
          options: allRegion.map((v) => {
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
    },
    onChange (v) {
      console.log(v, '================')
    }
  }
}
</script>
