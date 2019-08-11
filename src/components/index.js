// 封装一个插件 注册所有components下的组件为全局组件
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
// vue插件 暴露一个对象 对象中有一个选项 install安装的意思
export default {
  install (Vue) {
    // 安装函数 当vue。use(使用插件) install 被调用
    // vue全局的vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
