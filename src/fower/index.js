// 描述外观的原子类
// 源码：https://github.com/forsigner/fower
// VSCode提示插件：https://github.com/forsigner/fower/tree/master/fower-intellisense
// 
// 安装
// import fower '@/fower'
// app.use(fower)
// 使用方法，见Demo.vue

import { register } from './extraAtoms.js'
import { setConfig } from '@fower/core'
import { presetWeb } from '@fower/preset-web'
import { registerTheme } from './theme.js'

export default {
  install: (app) => {
    setConfig(presetWeb)
    register()
    registerTheme()
  }
}