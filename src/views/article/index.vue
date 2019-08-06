<template>
  <div class="container">
    <!-- //筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-form laber-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model=" reParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reParams.value" placeholder="请选择">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
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
      reParams: {
        status: null,
        value: null
      },
      // 频道下拉选项数据
      Options: [{ value: 1, label: 'js' }],
      // 日期数据
      dataArr: []
    }
  }
}
</script>

<style>
</style>
