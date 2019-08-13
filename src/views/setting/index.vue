<template>
    <div slot="container">
        <el-card>
            <div slot="header">
<my-bread>个人设置</my-bread>
            </div>
            <!-- 栅格系统 -->
            <el-row>
                 <el-col :span="12">
                     <!-- 表单 -->
                     <el-form label-width="120px">
                         <el-form-item label="编号:">{{userForm.id}}</el-form-item>
                         <el-form-item label="手机:">{{userForm.mobile}}</el-form-item>
                         <el-form-item label="媒体名称:">
                             <el-input v-model="userForm.name"></el-input>
                         </el-form-item>
                         <el-form-item label="媒体介绍:">
                             <el-input v-model="userForm.intro" type="textarea" rows="3"></el-input>
                         </el-form-item>
                         <el-form-item label="邮箱:">
                             <el-input v-model="userForm.email"></el-input>
                         </el-form-item>
                           <el-form-item><el-button type="primary" @click="saveUserInfo" >保存设置</el-button> </el-form-item>
                     </el-form>

                </el-col>
                 <el-col :span="12">
                     <!-- 上传头像 -->
                     <el-upload
                         class="avatar-uploader"
                         action=""
                         :http-request="myUpload"
                         :show-file-list="false"
                      >
                         <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <p style="text-align:center " >修改头像</p>
                 </el-col>
            </el-row>
        </el-card>

    </div>
</template>
<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: '',
        intro: '',
        email: '',
        photo: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (result) {
      // 选中图片 触发函数 选择的结果result
      // 文件信息获取 result.file
      // axiox+formdata 进行上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步home组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 获取个人信息
    async getUserInfo () {
      // 后台的头像 可能和前端本地保存头像不一致 保存后进行过修改 重新登录可同步
      const { data: { data } } = await this.$http('user/profile')
      this.userForm = data
    },
    // 保存个人信息
    async saveUserInfo () {
      // patch 请求类型做修改 局部修改
      // put 请求类型做修改 全局修改
      await this.$http.patch('user/profile', { name: this.userForm.name, intro: this.userForm.intro, email: this.userForm.email })
      this.$message.success('保存设置成功')
      // 当你刷新页面的时候 home组件使用的是本地存储的数据 更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新home
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>
<style></style>
