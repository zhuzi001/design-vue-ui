<template>
  <div>
    <h1 class="name"><span class="clip">design-vue-ui</span></h1>
    <p>
      <span>design-vue-ui</span> 是基于
      <span>Ant Design Vue v1.7.8</span> 版本进行封装的 UI
      组件库。为了提升用户体验和组件一致性，我们决定对库进行升级，整合
      <span>Ant Design Vue</span> 的新版本功能及新增组件。
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "这是我的 VuePress 网站！",
    };
  },
};
</script>
<style lang="less" scoped>
.name {
  font-size: 50px;
  text-align: center;
  .clip {
    background: var(--home-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
