export default {
  props: {
    groups: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    gHandleValue (gVal) {
      return this.getValue(gVal, (filterData) => {
        return this.groups.flatMap((group) => filterData(group.options || []))
      })
    }
  }
}
