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
          :options="options"
          :fieldNames="{ label: 'name', value: 'code' }"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-value-groups" prop="basicValue1">
        <d-select
          v-model="form.basicValue1"
          :groups="groups"
          :fieldNames="{
            label: 'region_name',
            value: 'region_code',
          }"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-labelInValue" prop="basicValueObj">
        <d-select
          v-model="form.basicValueObj"
          labelInValue
          :options="options"
          @change="onChange"
          :fieldNames="{ label: 'name', value: 'code' }"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item label="基本使用-multiple-value" prop="basicValueArr">
        <d-select
          v-model="form.basicValueArr"
          :options="options"
          mode="multiple"
          @change="onChange"
          :fieldNames="{ label: 'name', value: 'code' }"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item
        label="基本使用-multiple-value-groups"
        prop="basicValueArr12"
      >
        <d-select
          v-model="form.basicValueArr12"
          :groups="groups"
          :fieldNames="{
            label: 'region_name',
            value: 'region_code',
          }"
          mode="multiple"
          @change="onChange"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item
        label="基本使用-multiple-labelInValue"
        prop="basicValueObjArr"
      >
        <d-select
          v-model="form.basicValueObjArr"
          labelInValue
          :options="options"
          mode="multiple"
          @change="onChange"
          :fieldNames="{ label: 'name', value: 'code' }"
          placeholder="请选择"
        />
      </a-form-model-item>
      <!-- 自定义 回填到选择框的 Option 的属性值 optionLabelProp -->
      <a-form-model-item
        label="回填到选择框-optionLabelProp 默认"
        prop="optionLabelProp1"
      >
        <d-select
          placeholder="请选择--默认显示option"
          :options="options"
          :fieldNames="{ label: 'name', value: 'code' }"
          v-model="form.optionLabelProp1"
        >
          <template #label="{ option }">
            {{ option.name }}{{ option.code }}
          </template>
        </d-select>
      </a-form-model-item>
      <a-form-model-item
        label="回填到选择框-optionLabelProp -  value"
        prop="optionLabelProp2"
      >
        <d-select
          placeholder="请选择"
          :options="options"
          :fieldNames="{ label: 'name', value: 'code' }"
          v-model="form.optionLabelProp2"
          optionLabelProp="value"
        >
          <template #label="{ option }">
            {{ option.name }}{{ option.code }}
          </template>
        </d-select>
      </a-form-model-item>
      <a-form-model-item
        label="回填到选择框-optionLabelProp -  label"
        prop="optionLabelProp3"
      >
        <d-select
          placeholder="请选择"
          :options="options"
          :fieldNames="{ label: 'name', value: 'code' }"
          v-model="form.optionLabelProp3"
          optionLabelProp="label"
        >
          <template #label="{ option }">
            {{ option.name }}{{ option.code }}
          </template>
        </d-select>
      </a-form-model-item>
      <!-- 分页 -->
      <a-form-model-item label="分页-pagination-基本" prop="pagination1">
        <d-select
          v-model="form.pagination1"
          placeholder="请选择"
          :options="options"
          showSearch
          pageType="pagination"
          optionFilterProp="label"
          :fieldNames="{ label: 'name', value: 'code' }"
          :pag="{
            current: 1,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }"
        />
      </a-form-model-item>
      <a-form-model-item label="分页-pagination-group" prop="pagination2">
        <d-select
          v-model="form.pagination2"
          placeholder="请选择"
          :groups="groups"
          pageType="pagination"
          showSearch
          :fieldNames="{
            label: 'region_name',
            value: 'region_code',
          }"
          optionFilterProp="label"
          :pag="{
            current: 1,
            pageSize: 1,
            showTotal: (total) => `共 ${total} 组`,
          }"
        >
        </d-select>
      </a-form-model-item>
      <!-- 下滑加载 -->
      <a-form-model-item label="动态加载-load-基本" prop="loadValue">
        <d-select
          v-model="form.loadValue"
          placeholder="请选择"
          :options="options"
          showSearch
          :fieldNames="{ label: 'name', value: 'code' }"
          optionFilterProp="label"
          pageType="scroll"
          :pag="{
            current: 1,
            pageSize: 10,
          }"
        >
        </d-select>
      </a-form-model-item>
      <a-form-model-item label="动态加载-load-远程搜索" prop="loadRemote">
        <d-select
          v-model="form.loadRemote"
          placeholder="请选择"
          :options="filterOptions"
          showSearch
          :fieldNames="{ label: 'name', value: 'code' }"
          optionFilterProp="label"
          pageType="scroll"
          :total="options.length"
          :loadData="loadData"
          :searchLoading="searchLoading"
          @search="search"
        >
        </d-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import allRegion from '../json/allRegion.json'
import region from '../json/region.json'
export default {
  data () {
    return {
      form: {
        basicValueObjArr: [],
        basicValueArr: []
      },
      rules: {
        basicValue: { required: true, message: '请选择', trigger: 'change' },
        basicValueObj: { required: true, message: '请选择', trigger: 'change' },
        basicValueArr: { required: true, message: '请选择', trigger: 'change' },
        basicValueObjArr: {
          required: true,
          message: '请选择',
          trigger: 'change'
        },
        optionLabelProp1: {
          required: true,
          message: '请选择',
          trigger: 'change'
        },
        optionLabelProp2: {
          required: true,
          message: '请选择',
          trigger: 'change'
        },
        optionLabelProp3: {
          required: true,
          message: '请选择',
          trigger: 'change'
        },
        pagination1: { required: true, message: '请选择', trigger: 'change' },
        pagination2: { required: true, message: '请选择', trigger: 'change' },
        loadValue: { required: true, message: '请选择', trigger: 'change' },
        loadRemote: { required: true, message: '请选择', trigger: 'change' }
      },
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      selectedValueArr: ['130000'],
      selectedValueStr: null,
      selectedValueObj: undefined,
      selectedValueObjArr: undefined,
      options: allRegion,
      filterOptions: allRegion.slice(0, 10),
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
      this.searchLoading = true
      setTimeout(() => {
        this.searchLoading = false
      }, 1200)
    },
    loadData (e) {
      if (this.loading) return
      if (this.total <= this.filterOptions.length) return
      const { current, pageSize } = this.pag
      // 下面相当于一个后台接口
      this.loading = true // 这里相当于节流的作用，免得获取同样数据进行追加
      setTimeout(() => {
        this.loading = false
        const start = current * pageSize
        const end = (current + 1) * pageSize
        const _optionArr = allRegion.slice(start, end)
        this.filterOptions.push(..._optionArr)
        this.pag.current++
      }, 500)
    }
  }
}
</script>
