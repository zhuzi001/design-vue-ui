<template>
  <div class="container">
    <slot></slot>
    <div class="column" ref="column1"></div>
    <div class="column" ref="column2" v-if="!isMiniScreen"></div>
  </div>
</template>

<script>
export default {
  name: "TwoColumnLayout",
  props: {
    single: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMiniScreen: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.distributeSlots();
    });
  },
  methods: {
    isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    },
    distributeSlots() {
      const slotContent = this.$slots.default || [];
      const column1 = this.$refs.column1;
      const column2 = this.$refs.column2;

      let half = Math.ceil(slotContent.length / 2);
      slotContent.slice(0, half).forEach((vnode) => {
        // 注意：在 Vue 2 中，直接使用 vnode.el 可能不起作用，
        // 所以我们用 $el 来获取真实 DOM 元素
        if (vnode.elm) {
          column1.appendChild(vnode.elm);
        }
      });
      this.isMiniScreen = this.single || this.isMobile() || window.innerWidth < 800;
      slotContent.slice(half).forEach((vnode) => {
        if (vnode.elm) {
          this.isMiniScreen
            ? column1.appendChild(vnode.elm)
            : column2.appendChild(vnode.elm);
        }
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
}

.column {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
