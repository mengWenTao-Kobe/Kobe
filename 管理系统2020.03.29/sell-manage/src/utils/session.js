/* 
  本地存储操作封装
  created by 孟文韬 2020/4/2
*/

export default {
  // 获取本地存储
  get(k) {
    return JSON.parse(window.sessionStorage.getItem(k))
  },
  // 设置本地存储
  set(k, v) {
    window.sessionStorage.setItem(k, JSON.stringify(v))
  },
  // 删除本地存储
  remove(k) {
    window.sessionStorage.removeItem(k)
  },
  // 清空本地存储
  clear() {
    window.sessionStorage.clear()
  },
}