<template>
  <el-container class="warp">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{minLogo:isCollapse}"></div>
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settinng">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="drop" @command="changeMenu">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 本地获取用户信息
    const user = Store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏展开与收起。默认是张开
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // click 是点击事件 是原生的事件 原生dom支持事件
      // 期望 把事件绑定在组件解析后的原生dom上 .native修饰
      this.$router.push('/setting')
    },
    logout () {
      Store.clearUser()
      this.$router.push('/login')
    },
    // 绑定事件的时候 不加括弧 为了加默认参数
    changeMenu (menuType) {
      // menuType是变量值 setting logout
      this[menuType]()
    }
  }
}
</script>

<style scoped lang="less">
.warp {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
.drop {
  float: right;
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .el-dropdown-link {
    font-weight: 700;
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: url(../../assets/images/logo_admin.png) no-repeat center/ 140px
    auto;
}
.minLogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 32px auto;
}
.el-menu {
  border-right: none;
}
</style>
