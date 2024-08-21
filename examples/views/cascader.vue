<template>
  <div style="padding: 48px">
    <a-cascader
      :options="options"
      placeholder="Please select"
      @change="onChange"
    />

    <d-cascader
      :options="options"
      placeholder="Please select"
      @change="onChange"
      :allowClear="false"
      v-model="form.selectChildValue"
      showCheckedChild
      :getPopupContainer="() => document.body"
    ></d-cascader>
    <d-cascader
      :options="options"
      placeholder="Please select"
      @change="onChange"
      :allowClear="false"
      v-model="form.selectValue"
      optionLabelProp="value"
      :getPopupContainer="() => document.body"
    ></d-cascader>
    <d-cascader
          :options="allRegion"
          :fieldNames="{label: 'name', value: 'code', children: 'areaList'}"
          placeholder="Please select"
          @change="onChange"
          style="width: 240px"
          :allowClear="false"
          v-model="form.selectValue123"
          showSelectAll
          :getPopupContainer="() => document.body"
        ></d-cascader>
    <a-form-model layout="inline">
      <a-form-model-item label="Activity name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="Activity zone">
        <d-cascader
          :options="options"
          placeholder="Please select"
          @change="onChange"
          style="width: 240px"
          :allowClear="false"
          labelInValue
          showSelectAll
          v-model="form.selectValue2"
          :getPopupContainer="() => document.body"
        ></d-cascader>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import jsonData from '../json/region.json'
import allRegion from '../json/allRegion.json'
export default {
  data () {
    return {
      options: [],
      allRegion,
      form: {
        selectValue: []
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.options.push(this.buildTree(jsonData.data))
    },
    onChange (value, childArr, parentArr) {
      // console.log(value, childArr, parentArr)
    },
    buildTree (data) {
      // 创建一个字典来存储所有节点
      const nodes = {}
      // 创建一个变量来存储根节点
      let root = null

      // 遍历数据并创建节点
      data.forEach((item) => {
        nodes[item.region_code] = {
          pid: item.parent_region_code,
          id: item.region_code,
          value: item.region_code,
          label: item.region_name,
          children: []
        }
      })

      // 构建树结构
      data.forEach((item) => {
        const node = nodes[item.region_code]
        if (item.parent_region_code === null) {
          // 如果没有父节点，说明是根节点
          root = node
        } else {
          // 如果有父节点，则将当前节点添加到父节点的子节点中
          nodes[item.parent_region_code].children.push(node)
        }
      })

      return root
    }
  }
}
</script>
