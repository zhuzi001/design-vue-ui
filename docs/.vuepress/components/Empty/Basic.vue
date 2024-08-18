<template>
  <div class="xxx_main">
    <!-- 暂无任何数据 -->
    <c-empty imageType="empty" />
    <!-- 404 -->
    <c-empty imageType="404" />
    <!-- 暂无任何数据 -->
    <c-empty imageType="chartEmpty" />
    <!-- 暂无任何内容 -->
    <c-empty imageType="contentEmpty" />
    <!-- 项目开发中 -->
    <c-empty imageType="deving" />
    <!-- 网络出错，无法访问此网络 -->
    <c-empty imageType="disconnection" />
    <!-- 暂无任何图片 -->
    <c-empty imageType="error" />
    <!-- 暂无任何列表 -->
    <c-empty imageType="listEmpty" />
    <!-- 暂无任何消息 -->
    <c-empty imageType="newsEmpty" />
    <!-- 暂无任何联系人 -->
    <c-empty imageType="peopleEmpty" />
    <!-- 你暂时无此权限 -->
    <c-empty imageType="power" />
    <!-- 搜索暂无结果 -->
    <c-empty imageType="searchEmpty" />
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
