import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: [],
    };
  },
  created() {
    this.options = this.deepClone(region.data);
  },
  methods: {
    deepClone(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map((v) => this.deepClone(v));
      }

      const clonedObj = {};
      for (const key of Object.keys(obj)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }

      return clonedObj;
    },
  },
};
