<template>
  <div style="padding: 48px">
    <div>
      <br />
      <button @click="init">点击显示加载中、、、1秒自动关闭</button>
    </div>

    <!-- <d-table
      :columns="columns"
      :data-source="data"
      :pag="pag"
      @changeSize="changeSize"
      @setColumns="setColumns"
    >
     <a slot="name" slot-scope="{text}">{{ text }}</a>
    <span slot="customTitle"  slot-scope="{text}">{{text}}<a-icon type="smile-o" /> Name</span>
      <span slot="action" >
       添加
        </span>
    </d-table> -->

  </div>
</template>
<script>
export default {
  data () {
    const columns = [
      {
        dataIndex: 'index',
        key: 'index',
        // slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'c-index' }
      },
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        scopedSlots: { customRender: 'c-tip' }
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'c-badge' }
      },
      {
        title: 'Tags2',
        key: 'tags2',
        dataIndex: 'tags2',
        config: {},
        scopedSlots: {
          customRender: 'c-badge',
          status: {
            1: 'success',
            0: 'error',
            default: 'warning'
          },
          txt: {
            1: '成功了',
            0: '失败了',
            default: '不知道'
          }
        }
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]

    const data = []
    for (let index = 0; index < 22; index++) {
      const element = {
        key: index,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: (index % 2).toString(),
        tags2: index % 3
      }
      data.push(element)
    }
    return {
      columns,
      data,
      pag: {
        page: 1,
        page_size: 10,
        total: 22
      }
    }
  },
  methods: {
    init () {
      this.$xmLoading.show()
      this.hide()
    },
    hide () {
      setTimeout(() => {
        this.$xmLoading.hide()
      }, 1000)
    },
    setColumns (value) {
      this.columns = value
    },
    changeSize (page, pageSize) {
      this.pag.page = page
      this.pag.page_size = pageSize
    }
  }
}
</script>
