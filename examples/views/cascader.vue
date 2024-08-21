<template>
  <div class="cascader-main" style="padding: 48px">
    <h2>基本使用</h2>
    <d-cascader
      :options="options"
      placeholder="请选择"
      v-model="form.selectChildValue"
    ></d-cascader>
    <h2>只显示选中的子节点</h2>
    <d-cascader
      :options="options"
      placeholder="请选择省市区"
      v-model="form.selectValue"
      showCheckedChild
    ></d-cascader>
    <h2>自定义字段名</h2>
    <d-cascader
      :options="allRegion"
      :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
      v-model="form.selectValue123"
    ></d-cascader>
    <h2>显示全选按钮进行全选处理</h2>
    <d-cascader
      :options="options"
      @change="onChange"
      v-model="form.selectValue12343"
      showSelectAll
    ></d-cascader>
    <h2>label 包装到 value 中 {key: string, label: string}</h2>
    <d-cascader
      :options="options"
      placeholder="Please select"
      labelInValue
      v-model="form.selectValue3332"
    >
    </d-cascader>
    <h2>自定义 option 显示数据</h2>
    <d-cascader
      :options="options"
      placeholder="Please select"
      showSelectAll
      v-model="form.selectValue2434"
    >
      <template #optionRender="{ option }">
        {{ option.label }} （{{ option.value }}）
      </template>
    </d-cascader>
    <h2>获取当前选择的 item 数据</h2>
    <a-space direction="vertical" style="width: 100%" :size="24">
      <d-cascader
        :options="options"
        v-model="form.selectValue5462"
        @change="cascaderChange"
      >
        <template #optionRender="{ option }">
          {{ option.label }} （{{ option.value }}）
        </template>
      </d-cascader>
      <a-alert message="选中的子节点 Item" type="info">
        <p slot="description">
          {{ JSON.stringify(childValue) }}
        </p>
      </a-alert>
      <a-alert message="选中的节点 Item" type="info">
        <p slot="description">
          {{ JSON.stringify(parentValue) }}
        </p>
      </a-alert>
    </a-space>
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
      },
      childValue: [],
      parentValue: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    cascaderChange (v, childValue, parentValue) {
      console.log(v, childValue, parentValue)
      this.childValue = childValue
      this.parentValue = parentValue
    },
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
<style lang="less" scoped>
.cascader-main {
  padding: 48px;
  h2 {
    margin: 24px 0;
  }
}
</style>
