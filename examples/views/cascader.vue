<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>基本使用</h2>
     <div style="display:flex">
      <span style="flex: 1">占位符，为了测试超出边界</span>
      <d-cascader
        :options="options"
        placeholder="请选择"
        style="width: 200px"
        v-model="form.selectValue"
        @change="cascaderChange"
        showSearch
        allow-resize
      ></d-cascader>
     </div>
      <h2>只显示选中的子节点</h2>
      <d-cascader
        :options="options"
        placeholder="请选择省市区"
        v-model="form.selectChildValue"
        showCheckedChild
        @change="cascaderChange"
      ></d-cascader>
      <h2>显示全选按钮进行全选处理</h2>
      <d-cascader
        :options="options"
        @change="cascaderChange"
        v-model="form.selectValue"
        showSelectAll
      ></d-cascader>
      <h2>label 包装到 value 中 {key: string, label: string}</h2>
      <d-cascader
        :options="options"
        placeholder="Please select"
        labelInValue
        showCheckedChild
        @change="cascaderChange"
        v-model="form.selectChildLabelInValue"
      >
      </d-cascader>
      <h2>自定义 option 显示数据</h2>
      <d-cascader
        :options="options"
        placeholder="Please select"
        @change="cascaderChange"
        showSelectAll
        v-model="form.selectValue"
      >
        <template #optionRender="{ option }">
          {{ option.label }} （{{ option.value }}）
        </template>
      </d-cascader>
      <h2>自定义已选项</h2>
      <a-alert
        message="注意"
        description="返回值格式为 [{ label: **,key: ** }] ， 因为处理后的数据逻辑 key 值 会变化， 采用这种方式，要么 key 使用 fieldNames中的 value 值， 要么通过 deselect 自己进行删除处理逻辑"
        type="warning"
        show-icon
      />
      <d-cascader
        :options="options"
        v-model="form.selectValue"
        @change="cascaderChange"
        :displayRender="displayRender1"
      >
      </d-cascader>
       <d-cascader
        :options="options"
        v-model="form.selectValue"
        @change="cascaderChange"
        :displayRender="displayRender"
        @deselect="deselect"
      >
        <template #optionRender="{ option }">
          {{ option.label }} （{{ option.value }}）
        </template>
      </d-cascader>
      <h2>自定义字段名</h2>
      <d-cascader
        :options="allRegion"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList1' }"
        v-model="form.allRegionValue"
        :load-data="itemClick"
      ></d-cascader>
       <!-- <d-cascader
        :options="allRegion"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        v-model="form.allRegionValue"
      ></d-cascader>
      <d-cascader
        :options="allRegion"
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList1' }"
        v-model="form.allRegionValue2"
        labelInValue
        :load-data="itemClick"
      ></d-cascader>
       <d-cascader
        :options="allRegion"
        labelInValue
        :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        v-model="form.allRegionValue2"
      ></d-cascader> -->
      <h2>自定义 没有数据的 option面板 显示效果</h2>
      <d-cascader
        :options="[]"
        placeholder="Please select"
        @change="cascaderChange"
        showSelectAll
        v-model="form.selectValue"
      >
      </d-cascader>
      <d-cascader
        :options="[]"
        placeholder="Please select"
        @change="cascaderChange"
        showSelectAll
        v-model="form.selectValue"
      >
        <template #notFoundContent>
          <a-empty />
        </template>
      </d-cascader>
      <h2>获取当前选择的 item 数据</h2>
      <a-alert message="选中的子节点 Item 返回数据" type="info">
        <p slot="description">
          {{ JSON.stringify(childValue) }}
        </p>
      </a-alert>
      <a-alert message="选中的节点 Item 返回数据" type="info">
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
import allRegionArr from '../json/allRegionArr.json'
export default {
  data () {
    return {
      options: [],
      allRegionArr,
      allRegion,
      form: {
        selectChildValue: [],
        selectValue: [],
        selectLabelInValue: [],
        selectChildLabelInValue: [],
        // allRegionValue: ['110101', '110102', '110103'],
        allRegionValue: [{ label: '东城区', key: '110101' }, { label: '西城区', key: '110102' }, { label: '崇文区', key: '110103' }, { label: '阳泉市', key: '140300' }]
      },
      childValue: [],
      parentValue: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    displayRender1 (itemArr) {
      return itemArr.map(v => {
        return {
          key: v.key,
          label: `${v.label}（${v.id}）`
        }
      })
    },
    displayRender (itemArr) {
      const _levObj = {
        1: {
          num: 0,
          prev: '省',
          next: '个'
        },
        2: {
          num: 0,
          prev: '市',
          next: '个'
        },
        3: {
          num: 0,
          prev: '区',
          next: '个'
        }
      }
      if (!itemArr.length) return []
      const arr = []
      itemArr.forEach((v) => {
        _levObj[v.level].num++
      })
      for (const key in _levObj) {
        if (Object.prototype.hasOwnProperty.call(_levObj, key)) {
          arr.push(`${_levObj[key].prev}${_levObj[key].num}${_levObj[key].next}`)
        }
      }
      return arr
    },
    itemClick (item) {
      console.log(item, 'itemClick')
      if (!item.areaList) return
      item.areaList1 = item.areaList.map(v => {
        v.disabled = Math.random(10) < 0.1
        v.isLeaf = v.level === 2
        return v
      })
    },
    deselect (val) {
      // 自己删除的处理逻辑
      // console.log(val)
    },
    cascaderChange (v, childValue, parentValue) {
      // console.log(v, childValue, parentValue)
      this.childValue = childValue
      this.parentValue = parentValue
      this.form.selectChildValue = childValue.map((v) => v.key)
      this.form.selectValue = parentValue.map((v) => v.key)
      this.form.selectLabelInValue = parentValue.map((v) => v)
      this.form.selectChildLabelInValue = childValue.map((v) => v)
    },
    initData () {
      this.options.push(this.buildTree(jsonData.data))
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
          level: item.region_lev,
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
