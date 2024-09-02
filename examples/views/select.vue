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
      <a-form-model-item label="分页pagination-load-远程搜索" prop="loadRemot2e">
        <d-select
          v-model="form.loadRemot2e"
          placeholder="请选择"
          :options="filterOptions1"
          showSearch
          :fieldNames="{ label: 'name', value: 'code' }"
          optionFilterProp="label"
          pageType="paginationRemote"
          :total="total1"
          :searchLoading="searchLoading"
          @search="search1"
          @focus="search1('')"
          @pagChange="loadData1"
          :pag="pag1"
        >
        </d-select>
      </a-form-model-item>
      <a-form-model-item label="分页pagination-load-远程搜索" prop="loadRemot2e2">
        <d-select
          v-model="form.loadRemot2e2"
          placeholder="请选择"
          :options="filterOptions1"
          showSearch
          mode="multiple"
          :fieldNames="{ label: 'name', value: 'code' }"
          optionFilterProp="label"
          pageType="paginationRemote"
          :total="total1"
          :searchLoading="searchLoading"
          @search="search1"
          @focus="search1('')"
          @pagChange="loadData1"
          :pag="pag1"
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
        basicValueObjArr: [],
        basicValueArr: [],
        loadRemot2e: '630000',
        selectValue: [],
        loadRemot2e2: ['630000']
      },
      inputValue1: '',
      rules: {
        basicValue: { required: true, message: '请选择', trigger: 'change' },
        basicValueObj: { required: true, message: '请选择', trigger: 'change' },
        basicValueArr: { required: true, message: '请选择', trigger: 'change' },
        selectValue: { required: true, message: '请选择', trigger: 'change' },
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
        loadRemote: { required: true, message: '请选择', trigger: 'change' },
        basicValueArr12: { required: true, message: '请选择', trigger: 'change' },
        loadRemot2e: { required: true, message: '请选择', trigger: 'change' },
        loadRemot2e2: { required: true, message: '请选择', trigger: 'change' }
      },
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      selectedValueStr: null,
      selectedValueObj: undefined,
      selectedValueObjArr: undefined,
      options: allRegion,
      filterOptions: allRegion.slice(0, 10),
      filterOptions1: allRegion.slice(0, 10),
      total: allRegion.length,
      total1: allRegion.length,
      loading: false,
      searchLoading: false,
      pag: {
        current: 1,
        pageSize: 10
      },
      pag1: {
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`
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
    // isPag 是否 pagination
    async queryData (param, isPag) {
      const { current, pageSize, inputValue } = param
      // 下面相当于一个后台接口
      await this.delay(1000)
      const start = (current - 1) * pageSize
      const end = current * pageSize
      const _all = inputValue ? allRegion
        .filter((v) => v.name.indexOf(inputValue) !== -1) : allRegion
      const _optionArr = _all.slice(start, end)
      return {
        data: _optionArr,
        current: current,
        total: _all.length
      }
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
      this.pag.current = 1
      this.searchLoading = true
      setTimeout(() => {
        this.searchLoading = false
      }, 1200)
    },
    async search1 (v) {
      this.pag1.current = 1
      this.searchLoading = true
      this.filterOptions1 = []
      this.inputValue1 = v
      const _resut = await this.queryData({
        pageSize: this.pag1.pageSize,
        current: this.pag1.current,
        inputValue: v
      })
      this.searchLoading = false
      this.filterOptions1 = _resut.data
      this.pag1.current = _resut.current || 1
      this.total1 = _resut.total || 0
    },
    async loadData (e) {
      if (this.loading) return
      if (this.total <= this.filterOptions.length) return
      // 下面相当于一个后台接口
      this.loading = true // 这里相当于节流的作用，免得获取同样数据进行追加
      const _resut = await this.queryData({
        pageSize: this.pag.pageSize,
        current: this.pag.current + 1
      })
      this.loading = false
      this.filterOptions.push(...(_resut.data || []))
      this.pag.current = _resut.current || 1
      this.total = _resut.total || 0
    },
    async loadData1 (current, pageSize) {
      if (this.searchLoading) return
      // if (this.total1 <= this.filterOptions1.length) return
      // 下面相当于一个后台接口
      this.searchLoading = true// 这里相当于节流的作用，免得获取同样数据进行追加
      const _resut = await this.queryData({
        current, pageSize, inputValue: this.inputValue1
      })
      this.searchLoading = false
      this.filterOptions1 = _resut.data || []
      this.pag1.current = _resut.current || 1
      this.total1 = _resut.total || 0
    }
  }
}
</script>
