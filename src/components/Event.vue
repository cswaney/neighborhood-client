<template>
  <div>
    <h1>Event: {{ event.title }}</h1>
    <p>Location: {{ event.location }}</p>
    <p>Date: {{ event.date }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Event',
  props: {
    event: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
