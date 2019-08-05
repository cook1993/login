// 存储信息
// 1.约定信息 的key 是什么   key
// 2.存储信息额值是什么 用户信息对象 字符串格式json
const KEY = 'key'
export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    //   JSON.parse()将json数据格式转换为对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
