<template>
  <div class="xm-main">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-form-model-item label="基本使用-value" prop="basicValue">
        <d-multiple-select
          v-model="form.basicValue"
          :options="options"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item label="isEnd" prop="basicValue2">
        <d-multiple-select
          v-model="form.basicValue2"
          :options="options"
          placeholder="请选择"
          isEnd
        />
      </a-form-model-item>
      <a-form-model-item label="isEnd 和 maxLevel = 2" prop="basicValue3">
        <d-multiple-select
          v-model="form.basicValue3"
          :options="options"
          placeholder="请选择"
          :maxLevel="2"
          isEnd
        />
      </a-form-model-item>
      <a-form-model-item label="isEnd 和 basicValue4 拥有默认值" prop="basicValue4">
        <d-multiple-select
          v-model="form.basicValue4"
          :options="options"
          placeholder="请选择"
          isEnd
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import baseMixin from "./baseMixin";
export default {
  mixins: [baseMixin],
  data() {
    return {
      form: {
        basicValue: [],
        basicValue1: [],
        basicValue2: [],
        basicValue3: [],
        basicValue4: ["320000", "320200", "320205"],
      },
      rules: {
        basicValue: { required: true, message: "请选择", trigger: "change" },
        basicValue1: { required: true, message: "请选择", trigger: "change" },
        basicValue2: { required: true, message: "请选择", trigger: "change" },
        basicValue3: { required: true, message: "请选择", trigger: "change" },
        basicValue4: { required: true, message: "请选择", trigger: "change" },
      }
    };
  },
  methods: {
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onChange() {
      console.log("sdhjfudish");
    },
  },
};
</script>
