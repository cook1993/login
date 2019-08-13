<template>
    <div class="container">
      com-b
      <button @click="fn">发送数据给a</button>
    </div>
</template>
<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: 'b主键'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('btoa', this.msg)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
