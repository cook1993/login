<template>
  <div class="container">
    <!-- //筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form laber-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己的组件 -->
<my-channel v-model='reParams.channel_id'></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="chengDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-button type="primary" @click="search()">筛选</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选结果共查询到{{total}}条结果</div>
      <el-table :data="articles">
        <el-table-column label="封面" prop="title">
<template slot-scope="scope">
<el-image
      style="width: 100px; height: 100px"
      :src="scope.row.cover.images[0]"
      >
      <div slot="error" class="image-slot">
       <img src="../../assets/images/error.gif" style="width: 100px; height: 100px" alt="">
      </div>
      </el-image>
</template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
       <template slot-scope="scope">
         <el-tag v-if="scope.row.status===1">待审核</el-tag>
         <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
         <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
         <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
         <el-tag v-if="scope.row.status===4" type="danger">删除</el-tag>
       </template>

        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
<el-button type="primary" plain @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
 <el-button type="danger" plain @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- //分页 -->
      <div style="text-align:center ;margin-top:20px">
        <!-- :tital="1000"指定總數 -->
        <!-- 默認一頁顯示10条：page-size='reqParams.per_page' -->
         <!-- @current-change="changePager" 页码改变事件 -->
         <!-- 更新过数据后 当前页码业也需要修改 选中对应的按钮 current-page-->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size='reParams.per_page'
        :current-page="reParams.page"
        @current-change="changePager"

        >
        </el-pagination>
      </div>
    </el-card>
    <my-test>
      <!-- slot-scope="scope"接收slot插槽上所有的自定义的属性集合{msg:'my -test的数据'} -->
      <!-- <div slot="content" slot-scope="scope">content {{scope.msg}}</div> -->
      <template v-slot:content="scope">content {{scope.msg}}</template>
      <div slot="footer">footer</div>
    </my-test>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选项表单数据,提交给后端
      // axios提交数据 值为null是不会携带参数的
      reParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20

      },

      // 频道下拉选项数据
      channelOptions: [],
      // 日期数据
      dataArr: [

      ],
      // 文章列表
      articles: [],
      // 总条数
      total: 0

    }
  },
  // computed计算属性使用场景：当你需要一个新的数据，需要依赖data中的数据
  // watch侦探器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作，异步操作
  // watch: {
  //   'reParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reParams.channel_id = null
  //     }
  //   }
  // },

  created () {
    this.getArticles()
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认框，点击确定后 响应成功更新列表即可
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {

      })
    },
    // 日期选择后事件
    chengDate (dataArr) {
      // 严禁一些，清空数据考虑在内
      if (dataArr) {
        this.reParams.begin_pubdate = dataArr[0]
        this.reParams.end_pubdate = dataArr[1]
      } else {
        this.reParams.begin_pubdate = null
        this.reParams.end_pubdate = null
      }
    },
    // 筛选数据
    search () {
      // 筛选项双向绑定 拿着对应的数据发送请求即可 注意 重新筛选的页码第一页
      this.reParams.page = 1
      this.getArticles()
    },

    // 改变分页事件对应事件
    changePager (newPage) {
      // 修改获取数据页码
      this.reParams.page = newPage
      this.getArticles()
    },

    async getArticles () {
    // axios get 传参 url?key=value&key1=value1  ...麻烦
    // axios get传参 第二传参是对象 {params:指定的对象}发送请求的时候自动拼接地址栏后
      const { data: { data } } = await this.$http.get('articles', { params: this.reParams })
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }

}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 30px;
}
</style>
