  <template>
    <div class="my-image">
         <div class="img-btn">
             <img :src="value||defaultImage" alt="" @click="openDialog">
        </div>
        <!-- //对话框 -->
       <el-dialog title="选择封面" :visible.sync="dialogVisible" width="700px" >
         <span>
       <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="素材库" name="image">
      <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
       <el-radio-button :label="false">全部</el-radio-button>
       <el-radio-button :label="true" >收藏</el-radio-button>
           <div class="img-list">
              <div class="img-item" @click="selectedImage(item.url)" :class="{selected:selectedImageUrl === item.url}" v-for="item in images" :key='item.id'>
                  <img :src="item.url" alt="">

              </div>
           </div>
            <div style="text-align:center">
              <el-pagination
                 background
                 v-if='total>reqParams.per_page'
                 layout="prev, pager, next"
                 :page-size="reqParams.per_page"
                 :current-page="reqParams.pagesss"
                 @current-change="changePager"
                 :total="total">
           </el-pagination>
         </div>
   </el-radio-group>
</el-tab-pane>
 <el-tab-pane label="上传图片" name="upload">
  <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  :show-file-list="false"
  :on-success="handleSuccess"
  :headers="uploadHeaders"
  name="image"
  >
  <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
 </el-tab-pane>
  </el-tabs>
         </span>
         <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="confirmImage()">确 定</el-button>
         </span>
        </el-dialog>
    </div>
</template>>
<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      total: 0,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 上传的头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图片地址
      // vue-cli 3.0 基于webpack 打包所有的资源，如果src绑定的数据 是不会打包背后资源的
      // src url 指定资源 js文件 import 资源  可以主动通过import导入， webpack进行打包
      // value: defaultImage
      defaultImage
    }
  },

  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中的或者上传图片地址
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        // 提交给父组件
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 成功上传
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style lang="less">
.my-image {
  display:inline-block;
  margin-right:10px;
}
.dialog-footer {
    text-align: center;
    width: 100%;
    display:block;
}
.img-btn{
width: 160px;
height: 160px;
border:1px solid #ddd;
img{
    width: 100%;
    height: 100%;
    display: block;
}
}
.img-list {
  margin-top:10px;
.img-item {
width: 150px;
height: 120px;
border:1px dashed #ddd;
margin-right: 5px;
margin-bottom:10px;
display: inline-block;
position: relative;
&.selected {
  &::after {
//.img-item.selected:after()
content:"";
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
background:rgba(0,0,0,.2) url(../assets/images/selected.png) no-repeat center/50px 50px;
  }
}
img {
  width: 100%;
  height: 100%;
  // display: block;

}
  }
}
.el-upload {
  width: 180px;
  height: 180px;
}
</style>
