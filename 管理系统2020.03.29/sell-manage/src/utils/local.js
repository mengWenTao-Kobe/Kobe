/* 
  本地存储操作封装
  created by 孟文韬 2020/4/2
*/

export default {
  // 获取本地存储
  get(k) {
    return JSON.parse(window.localStorage.getItem(k))
  },
  // 设置本地存储
  set(k, v) {
    window.localStorage.setItem(k, JSON.stringify(v))
  },
  // 删除本地存储
  remove(k) {
    window.localStorage.removeItem(k)
  },
  // 清空本地存储
  clear() {
    window.localStorage.clear()
  },
}