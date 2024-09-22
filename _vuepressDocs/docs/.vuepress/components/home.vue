<template>
  <div class="home">
    <img
      :src="$withBase('/d.png')"
      alt="foo"
      style="margin: auto; width: 140px"
    />
    <h1 class="name"><span class="clip">design-vue-ui</span></h1>
    <p class="desc">
      <span>design-vue-ui</span> 是基于
      <span>Ant Design Vue v1.7.8</span> 版本进行封装的 UI
      组件库。为了提升用户体验和组件一致性，我们决定对库进行升级，整合
      <span>Ant Design Vue</span> 的新版本功能及新增组件。
    </p>
    <router-link to="/design/">
      <div class="btn">
        <a-icon type="thunderbolt" />
        快速上手
      </div>
    </router-link>
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
.home {
  text-align: center;
}
.name {
  font-size: 50px;
  .clip {
    background: var(--home-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (max-width: 400px) {
    font-size: 36px;
  }
}

.desc {
  span {
    font-weight: bold;
  }
}

.btn {
  display: inline-block;
  background-color: #3eaf7c;
  color: #fff;
  border-radius: 20px;
  padding: 4px 20px;
}
</style>
