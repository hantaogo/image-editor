export type Delegate = {
  getMinHeight: () => number // 最小高度
  getUserNick: () => Promise<String> // 获取用户昵称
}
