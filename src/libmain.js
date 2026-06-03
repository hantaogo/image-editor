import { createApp } from "vue"
import App from "@/App.vue"
import 'virtual:svg-icons-register'
import fower from '@/fower'
import 'whatwg-fetch'

import { setDelegate } from '@/delegate/delegate'
import { createSharedEventHub } from './utils/eventhub'

createSharedEventHub()

let appInstance = null
export const mount = (containerId, delegate) => {
  console.log('委托', delegate)
  setDelegate(delegate)

  console.log('挂载容器ID', containerId)
  const container = document.getElementById(containerId)
  appInstance = createApp(App)
  appInstance.use(fower)
  appInstance.mount(container)
}
export const unmount = () => {
  console.log('卸载', appInstance)
  appInstance.unmount()
}
