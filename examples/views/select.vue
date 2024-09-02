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
        <d-select
          v-model="form.basicValue"
          :groups="groups"
          :fieldNames="{ label: 'region_name', value: 'region_code' }"
          placeholder="请选择"
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
import region from '../json/region.json'
export default {
  data () {
    return {
      form: {
        basicValue: '820000',
        basicValueObjArr: []
      },
      inputValue: '',
      rules: {
        basicValue: { required: true, message: '请选择', trigger: 'change' }
      },
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      options: allRegion,
      total: allRegion.length,
      loading: false,
      searchLoading: false,
      pag: {
        current: 1,
        pageSize: 10
      },
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
  methods: {
    delay (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async queryData (param) {
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
    filterFunction (option) {
      // 只显示 label 包含 '1' 的选项
      return option.label.includes('1')
    },
    onChange (v) {
      console.log(v, '================')
    },
    search (v) {
    }
  }
}
</script>
