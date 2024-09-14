<template>
  <div style="width: 300px">
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 500 }"
      v-insert-content="customContent"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
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
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  directives: {
    insertContent: {
      bind (el, binding) {
        if (binding.value) {
          const targetDiv = el.querySelector('.ant-table-scroll') // 确保选择正确的元素
          const chidDiv = targetDiv.querySelector('.d-table-sticky-scroll') // 确保选择正确的元素
          if (targetDiv && !chidDiv) {
            const newDiv = document.createElement('div')
            newDiv.className = 'd-table-sticky-scroll'
            const innerDiv = document.createElement('div')
            innerDiv.className = 'd-table-sticky-scrol-bar' // 可以设置内部 div 的类名或者其他属性

            // 将内部 div 插入到新的 div 中
            newDiv.appendChild(innerDiv)

            // 将新的 div 元素插入到目标 div 中
            targetDiv.appendChild(newDiv)
          }
        }
      }
    }
  },
  data () {
    return {
      data,
      columns,
      customContent: '<div>这是自定义内容</div>' // 要插入的内容
    }
  }
}
</script>
<style lang="less">
.d-table-sticky-scroll{
  width: 100%;
  height: 5px;
  background: red;
  .d-table-sticky-scrol-bar{
    height: 100%;
    width: 50%;
    background: yellow;
  }
}
</style>
