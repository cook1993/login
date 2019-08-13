<template>
    <div class="container">
     com-a{{msg}}
    </div>
</template>
<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    // 事件需提前绑定 才能触发
    eventBus.$on('btoa', (data) => {
      this.msg = data
    })
  }
}
</script>
<style lang="less" scoped>

</style>
