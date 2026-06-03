// @flow
export const storage = {
  setItem(key, value) {
    sessionStorage.setItem(key, value)
  },
  getItem(key) {
    const t = sessionStorage.getItem(key)
    if (t === null) {
      return ''
    } else {
      return t
    }
  },
}