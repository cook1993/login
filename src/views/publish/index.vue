<template>
<div class="publish-container">
    <el-card>
        <div slot="header">
<my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
        </div>
        <!-- 表单 -->

        <el-form label-width="100px">
            <el-form-item label='标题'>
                <el-input v-model="artileForm.title" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label='内容'>
                <quill-editor v-model="artileForm.content" :options="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item label='封面'>
                <el-radio-group v-model="artileForm.cover.type" @change="chengaType">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <!-- //素材组件 -->
                <div v-if="artileForm.cover.type===1">
                   <my-image v-model="artileForm.cover.images[0]"></my-image>
                </div>
                 <div v-if="artileForm.cover.type===3">
                   <my-image v-model="artileForm.cover.images[0]"></my-image>
                   <my-image v-model="artileForm.cover.images[1]"></my-image>
                   <my-image v-model="artileForm.cover.images[3]"></my-image>
                </div>

            </el-form-item>
            <el-form-item label='频道'>
                <my-channel v-model="artileForm.channel_id">

                </my-channel>
                <el-form-item v-if="!articleId">
                    <el-button type="primary" @click="submit(false)">发表</el-button>
                    <el-button  @click="submit(true)">存入草稿</el-button>
                </el-form-item>
                <el-form-item v-else >
                    <el-button type="success" @click="update(false)">修改</el-button>
                    <el-button  @click="update(true)">存入草稿</el-button>
                </el-form-item>
            </el-form-item>

        </el-form>
    </el-card>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  created () {
    // 获取地址栏传参
    this.articleId = this.$route.query.id
    // 判断如果有id 修改文章 获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    // 不仅仅是data中的数据才能去监听 ￥route实例的数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.artileForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []

          },
          channel_id: null,
          // 文章id
          articleId: null

        }
      }
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.artileForm = data
    },
    // 重置图片
    chengaType () {
      this.artileForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.artileForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.artileForm)
      this.$message.success(draft ? '修改存入草稿成功' : '文章修改成功')
      this.$router.pussh('/article')
    }

  },
  data () {
    return {
      // 文章表单
      artileForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []

        },
        channel_id: null,
        // 文章id
        articleId: null

      },

      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}

</script>

<style lang="less">

</style>
