<template>
  <div>
    <d-cascader
      :options="options"
      v-model="form.selectValue"
      :displayRender="displayRender1"
    >
    </d-cascader>
    <d-cascader
      :options="options"
      v-model="form.selectValue"
      :displayRender="displayRender"
      @deselect="deselect"
      style="margin-top: 24px"
    >
      <template #optionRender="{ option }">
        {{ option.label }} （{{ option.value }}）
      </template>
    </d-cascader>
  </div>
</template>
<script>
import baseMixin from "./baseMixin";
export default {
  mixins: [baseMixin],
  data() {
    return {
      form: {
        selectValue: [],
      },
    };
  },
  created() {},
  methods: {
    displayRender1(itemArr, pItem) {
      return pItem.map((v) => {
        console.log(v);
        return {
          key: v.value,
          label: `${v.label}（${v.id}）`,
        };
      });
    },
    displayRender(itemArr, pItem) {
      const _levObj = {
        1: {
          num: 0,
          prev: "省",
          next: "个",
        },
        2: {
          num: 0,
          prev: "市",
          next: "个",
        },
        3: {
          num: 0,
          prev: "区",
          next: "个",
        },
      };
      if (!pItem.length) return [];
      const arr = [];
      pItem.forEach((v) => {
        _levObj[v.level].num++;
      });
      for (const key in _levObj) {
        if (Object.prototype.hasOwnProperty.call(_levObj, key)) {
          arr.push(
            `${_levObj[key].prev}${_levObj[key].num}${_levObj[key].next}`
          );
        }
      }
      return arr;
    },
    deselect(val) {
      // 自己删除的处理逻辑
      // console.log(val)
    },
  },
};
</script>
