export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    oHandleValue (oVal) {
      return this.getValue(oVal, (filterData) => {
        return filterData(this.options || [])
      })
    }
  }
}
