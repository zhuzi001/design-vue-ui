<template>
  <div class="xm-main">
    <div style="display: flex; gap: 24px">
      <a-card title="d-input-number" style="flex: 1">
        <a-space direction="vertical" style="width: 100%" :size="24">
          <h2>基本用法</h2>
          <d-input-number
            placeholder="请输入"
            :defaultValue="4"
            @change="onChange"
          />
          <d-input-number
            placeholder="请输入"
           v-model="form.textValue"
          />
          <h2>最大最小值</h2>
          <d-input-number
            placeholder="请输入"
            :defaultValue="22"
            :formatter="
              (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :min="12"
            :max="88"
          />
          <d-input-number
            placeholder="请输入"
            :defaultValue="21"
            :min="12"
            :max="88"
            :step="10"
          />
          <h2 class="blue-label">是否显示增减按钮</h2>
          <d-input-number
            v-model="form.textValue"
            placeholder="请输入"
            :defaultValue="4"
            :controls="false"
          >
          </d-input-number>
          <h2>格式化展示</h2>
          <d-input-number
            :default-value="1000"
            :formatter="
              (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            @change="onChange"
          />
          <h2 class="blue-label">前置/后置标签</h2>
          <d-input-number
            v-model="form.textValue"
            placeholder="请输入"
            style="width: 200px"
            addonAfter="￥"
          >
            <template #addonBefore> + </template>
          </d-input-number>
           <h2>精度 precision</h2>
           <d-input-number  v-model="form.precision" :precision="4" />
        </a-space>
      </a-card>
      <a-card title="a-input-number" style="flex: 1">
        <a-space direction="vertical" style="width: 100%" :size="24">
           <h2>基本用法</h2>
          <a-input-number
            placeholder="请输入"
            :defaultValue="4"
            allowClear
            @change="onChange"
          />
          <a-input-number
            placeholder="请输入"
           v-model="form.textValue"
          />
          <h2>最大最小值</h2>
          <a-input-number
            placeholder="请输入"
            :defaultValue="22"
            :formatter="
              (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :min="12"
            :max="88"
          />
           <a-input-number
            placeholder="请输入"
            :defaultValue="21"
            :min="12"
            :max="88"
            :step="10"
          />
          <h2>是否显示增减按钮 --- 没有</h2>
          <a-input-number
            v-model="form.textValue"
            placeholder="请输入"
            :defaultValue="4"
            :controls="false"
          >
          </a-input-number>
          <h2>格式化展示</h2>
          <a-input-number
            :default-value="1000"
            :formatter="
              (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            @change="onChange"
          />
          <h2 class="red-label">前置/后置标签 --- 没有</h2>
          <a-input-number
            v-model="form.textValue"
            placeholder="请输入"
            style="width: 200px"
            addonAfter="￥"
          >
            <template #addonBefore> + </template>
          </a-input-number>
          <h2>精度 precision</h2>
           <a-input-number  v-model="form.precision" :precision="4" />
        </a-space>
      </a-card>
    </div>
  </div>
</template>
<script>
import { InputNumber } from 'ant-design-vue'
export default {
  data () {
    return {
      form: {
        textValue: undefined,
        precision: undefined
      },
      textValue: 12
    }
  },
  mounted () {
    console.log(InputNumber)
  },
  methods: {
    onChange (value) {
      console.log('changed', value)
    }
  }
}
</script>
<style lang="less" scoped>
.red-label{
  color: red;
}

.blue-label{
  color: blue;
}
</style>
