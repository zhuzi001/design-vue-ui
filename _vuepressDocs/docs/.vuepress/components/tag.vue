<template>
  <div class="tag_contain">
    <a-card class="box-card">
      <div class="text item">
        <slot></slot>
      </div>
      <a-divider orientation="left" v-if="text">
        {{ text }}
      </a-divider>
      <slot name="content"></slot>
    </a-card>
    <div :class="{ sourceCode: !isShowCode }">
      <div class="control" @click="toggleCode">
        {{ isShowCode ? "隐藏代码" : "显示代码" }}
      </div>
      <div class="code-main">
        <slot name="sourceCode"></slot>
      </div>
    </div>
    <div class="control" @click="toggleCode">
      {{ isShowCode ? "隐藏代码" : "显示代码" }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowCode: false,
    };
  },
  props: {
    text: {
      default: "",
    },
  },
  methods: {
    toggleCode(event) {
      const element = event.target;
      const currentHeight = element.offsetHeight;
      element.style.height = `${currentHeight}px`; // 增加高度
      this.isShowCode = !this.isShowCode;
    }
  },
};
</script>
<style scoped lang="stylus">
.tag_contain {
  margin-top: 20px;
  position: relative;
  z-index: 2;
  border-top: 1px solid #eaeefb;
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.control {
  text-align: center;
  height: 44px;
  line-height: 44px;
  color: #000;
  background-color: #ecf2f9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  user-select: none;
  opacity: 0.5;
  /* transition: all 0.2s; */
}

.control:hover {
  opacity: 1;
  background-color: #eee;
}

.sourceCode {
  display: none;
}

.code_style {
  border: 1px solid #eee;
  background-color: #d3dce6;
}

.language-vue {
  margin: 0 !important;
}

.code-main{
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  scoll_bar(5px, 5px, #ccc);
  .language-vue{
     scoll_bar(5px, 5px, #ccc);
  }
}
</style>
