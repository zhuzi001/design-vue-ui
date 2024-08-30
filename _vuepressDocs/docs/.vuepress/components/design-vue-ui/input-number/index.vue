<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>基本用法</h2>
      <d-input-number
        placeholder="请输入"
        :defaultValue="4"
        @change="onChange"
      />
      <d-input-number placeholder="请输入" v-model="form.textValue" />
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
      <d-input-number v-model="form.precision" :precision="4" />
    </a-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        textValue: "",
      },
    };
  },
  methods: {
    onChange(value){}
  }
};
</script>
