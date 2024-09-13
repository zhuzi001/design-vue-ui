<template>
  <div>
    <p>
      <d-tooltip :content="txt"></d-tooltip>
    </p>
    <p>
      <d-tooltip :content="txt" :len="12"></d-tooltip>
    </p>
    <p>
      <d-tooltip :content="txtValue" :len="12"></d-tooltip>
    </p>
    <p>
      <d-tooltip :content="cusTxt" :len="12">
       {{cusTxt}}
      </d-tooltip>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      txt: "我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长我的文本很长很长",
      txtValue: "我是没有12长度数据",
      cusTxt: "气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom"
    };
  },
};
</script>
