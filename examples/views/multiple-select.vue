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
      <a-form-model-item label="基本使用-value" prop="basicValue1">
        <d-multiple-select
          v-model="form.basicValue1"
          :options="allRegion"
          placeholder="请选择"
          :maxLevel="3"
          :defaultLevel="3"
          :fieldNames="{ label: 'name', value: 'code' }"
          :loadData="loadData"
          @change="onChange"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-value" prop="basicValue21">
         <d-multiple-select
          v-model="form.basicValue21"
          :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
          :options="allRegion"
          placeholder="请选择"
          :renderValue.sync="form.renderValue"
          @change="onChange"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-value" prop="basicValue3">
        <d-multiple-select
          v-model="form.basicValue3"
          :options="allRegion"
          labelInValue
          placeholder="请选择"
          :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-value" prop="basicValue4">
        <d-multiple-select
          v-model="form.basicValue4"
          :options="allRegion"
          labelInValue
          placeholder="请选择"
          :fieldNames="{ label: 'name', value: 'code', children: 'areaList' }"
          pageType="pagination"
          :pag="{
            current: 1,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }"
          @pagChange="pagChange"
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
        basicValue: [],
        basicValue1: [],
        basicValue2: [],
        renderValue: ['430000', '430300', '430341'],
        basicValue3: [],
        basicValue21: ['430000', '430300', '430341'],
        basicValue4: [{ key: '430000', label: ' 湖南省 ' }, { key: '430300', label: ' 湘潭市 ' }, { key: '430341', label: ' 湘潭经济技术开发区 ' }]
      },
      inputValue1: '',
      rules: {
        basicValue: { required: true, message: '请选择', trigger: 'change' },
        basicValue1: { required: true, message: '请选择', trigger: 'change' },
        basicValue21: { required: true, message: '请选择', trigger: 'change' },
        basicValue2: { required: true, message: '请选择', trigger: 'change' }
      },
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
  },
  methods: {
    delay (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    /**
     *
     * @param valArr 值数组
     * @param index 当前下拉框的下标
     */
    async loadData ({ val, index, option, loadMode }) {
      console.log('================')
      await this.delay(1000)
      // 下面是模拟接口数据----忽略
      if (loadMode !== 'focus') return option.areaList
      let _options = allRegion
      for (let i = 0; i < index; i++) {
        const _val = val[i]
        const _option = _options.find((v) => v.code === _val)
        console.log('_option', _option)
        console.log(i, index)
        if (!_option) return []
        _options = _option.areaList
      }
      console.log(_options)
      return _options
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
    onChange (value) {
      console.log(value)
    },
    pagChange (current, pageSize, index) {
      console.log(current, pageSize, index)
    }
  }
}
</script>
