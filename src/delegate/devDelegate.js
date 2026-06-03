export const devDelegate = {
  getMinHeight: () => {
    console.log('document.body.clientHeight', document.body.clientHeight)
    return document.body.clientHeight - 24 * 2
  },
  getUserNick: () => {
    return Promise.resolve('小明')
  },
}
