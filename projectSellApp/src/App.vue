<template>
  <div id="app">
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from './pages/Nav'
  export default {
    components : {
      Nav
    }
  }
</script>

<style lang="less" scoped>
  #app{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>