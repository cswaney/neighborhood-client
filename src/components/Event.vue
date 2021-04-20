<template>
  <div>
    <div class="uk-card uk-card-default uk-width-1-1@m uk-margin-medium">
      <div class="uk-card-header uk-card-primary uk-padding-small">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
              <!-- <div class="uk-width-auto">
                  <img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg">
              </div> -->
              <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">{{ event.headline }}</h3>
                  <p class="uk-text-meta uk-margin-remove-top">
                    {{ this.formattedDate }}
                  </p>
              </div>
          </div>
      </div>
      <div class="uk-card-body uk-padding-small">
          <p>{{ event.description }}</p>
      </div>
      <div class="uk-card-footer uk-padding-small">
        <router-link v-bind:to="'/thread/' + event.id" class="uk-button uk-button-text">View thread</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Event',
  props: {
    event: Object,
  },
  computed: {
    formattedDate: function () {
      const date = new Date(this.event.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      return `${month}-${day}-${year}`
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
