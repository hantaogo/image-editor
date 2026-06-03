<template>
  <div id="workflow">
    <template v-if="errorMessage">
      <div>安装失败！</div>
      <div style="white-space: pre-line;">{{ errorMessage }}</div>
    </template>
  </div>
</template>

<script>
import setup from './install.js'

const { install, uninstall } = setup({
  libName: 'workflow',
  containerId: 'workflow',
  js: ['http://localhost:5100/workflow.umd.js'],
  css: ['http://localhost:5100/style.css'],
})

export default {
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    install(this.getDelegate()).then(error => {
      if (error) {
        this.errorMessage = error
      }
    })
  },
  beforeDestroy() {
    uninstall()
  },
  methods: {
    getDelegate() {
      return {
        title: '协同审批',
        copyright: 'Copyright：XXXXXX',
        getUserNick: this.getUserNick,
        approval: this.approval,
      }
    },
    getUserNick() {
      return Promise.resolve({
        ok: true,
        data: sessionStorage.getItem('userNick')
      })
    },
    approval(params) {
      console.log('审批的参数：', params)
      if (Math.random() > 0.5) {
        return Promise.resolve({
          ok: true,
          code: '200',
          msg: '成功',
          data: {
            userNick: '光头强',
          },
        })
      } else {
        return Promise.resolve({
          ok: false,
          code: '200',
          msg: '代码没写好呢！',
        })
      }
    },
  },
}
</script>
