<template>
  <div class="uk-section uk-section-default uk-section-small">
    <div class="uk-container uk-container-small">

      <!-- <ul class="uk-comment-list">
        <li>
          <comment v-bind:comment="comments[0]"></comment>
          <ul class="uk-comment-list">
            <li v-for="comment in replies" :key="comment.id">
              <comment v-bind:comment="comment" type="reply"></comment>
            </li>
          </ul>
        </li>
      </ul> -->

      <div class="uk-text-center">
        <h1 class="uk-heading-small uk-margin-small-bottom">{{ event.name }}</h1>
        <h4 class="uk-margin-remove">{{ event.date }} @ {{ event.address }}</h4>
        <img class="uk-border-rounded uk-align-center" src="../assets/images/playground.jpg" width="480" height="480" alt="">
        <p>{{ event.description }}</p>
      </div>
      <!-- <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover" data-src="../assets/images/playground.jpg" uk-img>
      </div> -->

      <h3>Dicussion</h3>
      <ul class="uk-comment-list">
          <li>
              <!-- <comment v-bind="comments[0]" type="announcement"></comment> -->
              <article class="uk-comment uk-visible-toggle" tabindex="-1">
                  <header class="uk-comment-header uk-position-relative">
                      <div class="uk-grid-medium uk-flex-middle" uk-grid>
                          <div class="uk-width-auto">
                              <img class="uk-border-rounded" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                          </div>
                          <div class="uk-width-expand">
                              <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ announcement.userName }}</a></h4>
                              <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">12 days ago</a></p>
                          </div>
                      </div>
                      <div class="uk-position-top-right uk-position-small uk-hidden-hover"><a class="uk-link-muted" href="#">Reply</a></div>
                  </header>
                  <div class="uk-comment-body">
                      <p>{{ announcement.text }}</p>
                  </div>
              </article>
              <ul class="uk-margin-medium-top">
                  <li v-for="comment in replies" :key="comment.commentId" class="uk-margin-small-top">
                      <!-- <comment v-bind="comment" type="reply"></comment> -->
                      <article class="uk-comment uk-comment-primary uk-visible-toggle" tabindex="-1">
                          <header class="uk-comment-header uk-position-relative">
                              <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                  <div class="uk-width-auto">
                                      <img class="uk-border-rounded" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                                  </div>
                                  <div class="uk-width-expand">
                                      <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ comment.userName }}</a></h4>
                                      <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">12 days ago</a></p>
                                  </div>
                              </div>
                              <div class="uk-position-top-right uk-position-small uk-hidden-hover"><a class="uk-link-muted" href="#">Reply</a></div>
                          </header>
                          <div class="uk-comment-body">
                              <p>{{ comment.text }}</p>
                          </div>
                      </article>
                  </li>
              </ul>
          </li>
      </ul>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import Comment from '@/components/Comment.vue'; // @ is an alias to /src
import { apiEndpoint } from '../config';

export default {
  name: 'Thread',
  props: {
    id: String,
  },
  components: {
    // Comment,
  },
  data() {
    return {
      event: {
        // id: '7aa791ac-9b06-41c3-b6e3-c9e4d058fcb7',
        name: 'Park Spring Cleaning',
        date: 'Sunday, May 1',
        location: 'Forrester Park',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
      },
      comments: [
        {
          id: 'abc',
          userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          createdAt: '2021-04-11T19:02:51.909Z',
        },
        {
          id: 'efg',
          userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          createdAt: '2021-04-11T19:00:35.802Z',
        },
        {
          id: 'hij',
          userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          createdAt: '2021-04-11T19:00:35.802Z',
        },
      ],
    };
  },
  methods: {
    async getComments() {
      console.log(`fetching comments (event=${this.id})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/thread/${this.id}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.comments = data.comments;
    },
  },
  computed: {
    loading () {
      return this.$auth.loading;
    },
    announcement () {
      return this.comments[0];
    },
    replies () {
      return this.comments.slice(1);
    },
  },
  async created() {
    console.log(`created view: Thread`);
    if (!this.loading) {
      await this.getComments();
    }
  },
  watch: {
    async loading () {
      if (!this.loading) {
        console.log('this.$auth done loading');
        await this.getComments(this.event.id);
      }
    }
  }
};
</script>
