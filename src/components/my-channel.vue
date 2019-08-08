<template>
    <!-- clearable -->
          <el-select clearable :value="value" @change="fn" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>

<script>

export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue:null
      channelOptions: []

    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getchannelOptions()
  },
  // 注意 当你清空内容的时候，值为空字符 处理成null数据
  methods: {
    async getchannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
      console.log(val)
    }

  }

}
</script>

<style>

</style>
