<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};

</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.theme.less";
@import "./assets/less/theme.less";
</style>
