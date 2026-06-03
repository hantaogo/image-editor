import { createApp } from "vue"
import App from "@/App.vue"
import 'virtual:svg-icons-register'
import fower from '@/fower'
import 'whatwg-fetch'

import { devDelegate } from '@/delegate/devDelegate'
import { setDelegate } from '@/delegate/delegate'
import { createSharedEventHub } from './utils/eventhub'

createSharedEventHub()

setDelegate(devDelegate)

const appInstance = createApp(App)
appInstance.use(fower)
appInstance.mount('#app')
