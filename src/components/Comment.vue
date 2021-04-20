<template>
  <div>
    <article v-if="!this.isReply" class="uk-comment uk-visible-toggle" tabindex="-1">
        <header class="uk-comment-header uk-position-relative">
            <div class="uk-grid-medium uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                    <img class="uk-border-circle" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                </div>
                <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ userName }}</a></h4>
                    <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">12 days ago</a></p>
                </div>
            </div>
            <div class="uk-position-top-right uk-position-small uk-hidden-hover"><a class="uk-link-muted" href="#">Reply</a></div>
        </header>
        <div class="uk-comment-body">
            <p>{{ text }}</p>
        </div>
    </article>
    <article v-if="this.isReply" class="uk-comment uk-comment-primary uk-visible-toggle" tabindex="-1">
        <header class="uk-comment-header uk-position-relative">
            <div class="uk-grid-medium uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                    <img class="uk-border-circle" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                </div>
                <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ userName }}</a></h4>
                    <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">12 days ago</a></p>
                </div>
            </div>
            <div class="uk-position-top-right uk-position-small uk-hidden-hover"><a class="uk-link-muted" href="#">Reply</a></div>
        </header>
        <div class="uk-comment-body">
            <p>{{ text }}</p>
        </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    // comment: Object,
    userId: String,
    userName: String,
    text: String,
    createdAt: String,
    type: String,
  },
  computed: {
    daysAgo() {
      // number of days between now and comment.createdAt
      return 12
    },
    isReply() {
      return this.type == 'reply'
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
