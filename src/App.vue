<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import UIKit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIKit.use(Icons);
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
