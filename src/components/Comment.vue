<template>
  <div>
    <p>{{ text }}</p>
    <p>{{ timestamp }}</p>
    <p>{{ author }}</p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    text: String,
    timestamp: String,
    author: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
