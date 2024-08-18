<template>
  <a-tag color="blue"> {{text}} </a-tag>
</template>
<script>
export default {
  props: {
    text: {
      default: "",
    },
  },
};
</script>
