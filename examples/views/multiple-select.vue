<template>
  <div class="xm-main">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="基本使用-value" prop="basicValue">
        <d-multiple-select
          v-model="form.basicValue"
          :options="allRegion"
          placeholder="请选择"
          :maxLevel="2"
          :defaultLevel="2"
          :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
          @change="onChange"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
    <div style="margin-top: 200px"></div>
  </div>
</template>

<script>
import allRegion from '../json/allRegion.json'
export default {
  data () {
    return {
      allRegion,
      form: {
        basicValue: []
      },
      inputValue1: '',
      rules: {
        basicValue: { required: true, message: '请选择', trigger: 'change' }
      },
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
  },
  methods: {
    delay (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },

    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    onChange () {
      console.log('sdhjfudish')
    }
  }
}
</script>
