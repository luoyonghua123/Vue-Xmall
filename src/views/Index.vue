<template>
  <div>
    
      <!-- <h3>导航</h3> -->
      <!-- 子路由的出口 -->
      <m-header></m-header>
      <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from '@/common/MHeader';
  //import Hello from '../common/Hello'
  export default {
    components: {
      MHeader
    },
  }
</script>

<style lang="scss" scoped>

</style>