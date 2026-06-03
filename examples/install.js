/**
 * 生成库的安装和卸载函数
 * 例子：
 * import setup from './install.js'
 * const { install, uninstall } = setup({
 *   libName: 'workflow',
 *   containerId: 'workflow',
 *   js: ['http://localhost:5100/workflow.umd.js'],
 *   css: ['http://localhost:5100/style.css'],
 * })
 * export default {
 *   mounted() {
 *     const delegate = { ... }
 *     install(delegate).then(error => {
 *       if (!error) {
 *         // ...
 *       }
 *   },
 *   beforeDestroy() {
 *     uninstall()
 *   },
 * }
 */
 const setup = ({ libName, containerId, js, css, showLog }) => {
  const addStyleSheet = url => {
    return new Promise(resolve => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
      link.addEventListener('load', () => {
        if (showLog) {
          console.log(`已添加样式表：${url}`)
        }
        resolve()
      })
      link.addEventListener('error', () => {
        const msg = `获取样式表失败：${url}`
        if (showLog) {
          console.warn(msg)
        }
        resolve(msg)
      })
    })
  }

  const removeStyleSheet = url => {
    const links = document.getElementsByTagName('link')
    const link = Array.from(links).find(t => t.href.includes(url))
    if (link) {
      link.parentNode.removeChild(link)
      if (showLog) {
        console.log(`已移除样式表：${url}`)
      }
    }
  }

  const addScript = url => {
    return new Promise((resolve, reject) => {
      const parentElement = document.getElementById(containerId)
      if (parentElement) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.defer = true
        script.src = url
        script.addEventListener('load', () => {
          if (showLog) {
            console.log(`已添加脚本：${url}`)
          }
          resolve()
        })
        script.addEventListener('error', () => {
          const msg = `获取脚本失败：${url}`
          if (showLog) {
            console.warn(msg)
          }
          resolve(msg)
        })
        parentElement.appendChild(script)
      }
    })
  }

  const removeScript = url => {
    const parentElement = document.getElementById(containerId)
    if (parentElement) {
      const scripts = parentElement.getElementsByTagName('script')
      const script = Array.from(scripts).find(t => t.src.includes(url))
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
        if (showLog) {
          console.log(`已移除脚本：${url}`)
        }
      }
    }
  }

  const install = (delegate) => {
    return new Promise(resolve => {
      const parentElement = document.getElementById(containerId)
      if (!parentElement) {
        resolve(`安装失败，没有找到容器节点：#${containerId}`)
        return
      }
      const tasks = [...js.map(t => addScript(t)), ...css.map(t => addStyleSheet(t))]
      Promise.all(tasks).then(results => {
        if (results.filter(error => error).length > 0) {
          resolve(results.join('\n'))
          return
        }
        if (!window[libName] && !window[libName].mount && !(window[libName].mount instanceof Function)) {
          resolve(`安装失败，获取挂载函数失败：window.${libName}`)
          return
        }
        const mount = window[libName].mount
        mount(containerId, delegate || {})
        resolve()
      })
    })
  }

  const uninstall = () => {
    if (window[libName] && window[libName].unmount && window[libName].unmount instanceof Function) {
      const unmount = window[libName].unmount
      unmount()
      js.map(t => removeScript(t))
      css.map(t => removeStyleSheet(t))
    }
  }

  return { install, uninstall }
}

export default setup
