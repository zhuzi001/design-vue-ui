<template>
  <div class="xxx_main">
    <c-empty
      image="https://img2.baidu.com/it/u=1875705305,2952422048&fm=26&fmt=auto"
      description="属性自定义文本"
    />
    <c-empty>
      <template slot="image">
        <img
          src="https://img0.baidu.com/it/u=1548287571,73805005&fm=26&fmt=auto"
        />
      </template>
      <template slot="description"> slot方式自定义文本 </template>
    </c-empty>
    <c-empty hideTxt :description="false">
      <template slot="image">
        <img
          src="https://img0.baidu.com/it/u=259013398,2352760336&fm=26&fmt=auto"
        />
      </template>
      <span>这里是其他slot自定义</span>
    </c-empty>
  </div>
</template>
<style lang="less" scoped>
.xxx_main {
  display: flex;
  flex-wrap: wrap;
  .ant-empty {
    width: 300px;
  }
}
</style>
