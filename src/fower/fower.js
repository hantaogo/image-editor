import { css as fowerCss } from '@fower/core'

/**
 * 使用fower将模板字符串转换为类名
 */
export const fower = (strings, ...args) => {
  /**
   * 将模板字符串的子字符串和参数合并后返回
   * 例如：
   * My name is ${Japple} :)
   * strings: ['My name is ', ' :)']
   * args: ['Japple']
   * 返回 'My name is Japple'
   * 模板字符串文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals
   */
  const arr = []
  for (let i = 0; i < strings.length; i++) {
    arr.push(strings[i])
    if (i !== strings.length - 1) {
      const arg = args[i]
      if (arg instanceof Function) {
        arr.push(arg())
      } else if (typeof arg === 'string' || typeof arg === 'boolean' || typeof arg === 'number') {
        arr.push(arg)
      }
    }
  }
  const str = arr.join('')
  // 将原子字符串转换为类名
  const obj = {}
  const atoms = str.split(' ')
  for (const atom of atoms) {
    const [k, v] = atom.split('=')
    obj[k] = v || true
  }
  return fowerCss([], obj)
}