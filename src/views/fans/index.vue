<template>
    <div class="container">
        <el-card>
            <div slot="header">
          <my-bread>
                  粉丝管理
           </my-bread>
            </div>
            <!-- tab -->
            <el-tabs type="border-card" v-model="activeName">
              <el-tab-pane label="粉丝列表" name="list">
                  <div class="fans-list">
                    <div class="fans-item" v-for="item in Fanslist" :key="item.id.toString()">
                      <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
                      <p style="font-size:12px">{{item.name}}</p>
                      <el-button size="mini" type="primary" plain>+关注</el-button>
                    </div>
                  </div>
                  <!-- 分页 -->
                   <el-pagination
             background
             layout="prev, pager, next"
             :total="total"
             :page-size="reqParams.per_page"
             :current-page="reqParams.page"
             @current-change="changePager"
             >
       </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="粉丝画像" name="photo">
                  <div ref='dom' style="width:600px;height:400px"></div>
              </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'photo',
      reqParams: {
        page: 1,
        per_page: 24
      },
      Fanslist: [],
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    this.initBar()
  },
  methods: {
    // 初始化柱状图
    initBar () {
      const dom = this.$refs.dom
      const myChart = echarts.init(dom)
      const options = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(options)
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.Fanslist = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style  lang="less" >
.fans-item {
    text-align: center;
    width: 120px;
    height: 170px;
    display: inline-block;
    border:1px solid #ddd;
    margin-right: 50px;
    margin-bottom:20px;
    padding-top:15px;

}
</style>
