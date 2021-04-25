<template>
  <div id="root">
    <Navbar v-bind:user="user" v-on:update-location="updateLocation"/>
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
          <!-- <img class="uk-border-rounded uk-align-center" src="../assets/images/playground.jpg" width="480" height="480" alt=""> -->
          <img class="uk-border-rounded uk-align-center" :src="event.attachmentUrl" width="480" height="480" alt="">
          <p>{{ event.description }}</p>
        </div>
        <!-- <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover" data-src="../assets/images/playground.jpg" uk-img>
        </div> -->

        <h3>Discussion</h3>
        <ul class="uk-comment-list">
            <li>
                <!-- <comment v-bind="comments[0]" type="announcement"></comment> -->
                <article v-if="comments.length > 0" class="uk-comment uk-visible-toggle" tabindex="-1">
                    <header class="uk-comment-header uk-position-relative">
                        <div class="uk-grid-medium uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <img class="uk-border-rounded" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                            </div>
                            <div class="uk-width-expand">
                                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ comments[0].userName }}</a></h4>
                                <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">12 days ago</a></p>
                            </div>
                        </div>
                        <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                          <a class="uk-icon-button tm-icon-button" href="#comment-textarea" uk-icon="reply" uk-scroll v-on:click="addingComment=true"></a>
                          <!-- <a class="uk-link-muted" href="#comment-textarea" uk-scroll v-on:click="addingComment=true">Reply</a> -->
                        </div>
                    </header>
                    <div class="uk-comment-body">
                        <p>{{ announcement.text }}</p>
                    </div>
                </article>
                <article v-else class="uk-comment uk-visible-toggle" tabindex="-1">
                    <header class="uk-comment-header uk-position-relative">
                        <div class="uk-grid-medium uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <img class="uk-border-rounded" :src="user.avatarUrl" width="80" height="80" alt="">
                            </div>
                            <div class="uk-width-expand">
                                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ user.name }}</a></h4>
                                <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">Now</a></p>
                            </div>
                        </div>
                        <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                          <button class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="close" v-on:click="addingComment=false"></button>
                          <button id="comment-check" class="uk-icon-button tm-icon-button" href="#" uk-icon="check" v-on:click="postComment"></button>
                        </div>
                    </header>
                    <div class="uk-comment-body">
                        <textarea id="comment-textarea" class="uk-textarea uk-form-width-large uk-border-rounded" rows="4" placeholder="Start the conversation!" v-model="commentText"></textarea>
                    </div>
                </article>
                <ul v-if="comments.length > 1" class="uk-margin-medium-top">
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
                                <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                                  <button v-show="user.id == comment.userId" class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="trash" v-on:click="deleteComment"></button>
                                  <button v-show="user.id == comment.userId" class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="pencil" v-on:click="editingComment=true"></button>
                                  <button class="uk-icon-button tm-icon-button" href="#" uk-icon="reply" v-on:click="addingComment=true"></button>
                                  <!-- <a class="uk-link-muted" href="#">Reply</a> -->
                                </div>
                            </header>
                            <div class="uk-comment-body">
                                <p>{{ comment.text }}</p>
                            </div>
                        </article>
                    </li>
                    <li v-show="addingComment" class="uk-margin-small-top">
                        <!-- <comment v-bind="comment" type="reply"></comment> -->
                        <article class="uk-comment uk-comment-primary uk-visible-toggle" tabindex="-1">
                            <header class="uk-comment-header uk-position-relative">
                                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                    <div class="uk-width-auto">
                                        <img class="uk-border-rounded" src="../assets/images/avatar.jpg" width="80" height="80" alt="">
                                    </div>
                                    <div class="uk-width-expand">
                                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ user.name }}</a></h4>
                                        <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">Now</a></p>
                                    </div>
                                </div>
                                <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                                  <button class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="close" v-on:click="addingComment=false"></button>
                                  <button id="comment-check" class="uk-icon-button tm-icon-button" href="#" uk-icon="check" v-on:click="postComment"></button>
                                </div>
                            </header>
                            <div class="uk-comment-body">
                                <textarea id="comment-textarea" class="uk-textarea uk-form-width-large uk-border-rounded" rows="4" placeholder="Add comment..." v-model="commentText"></textarea>
                            </div>
                        </article>
                    </li>
                </ul>
            </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { apiEndpoint } from '../config';

import Navbar from '@/components/Navbar.vue'; 
// import Comment from '@/components/Comment.vue';

export default {
  name: 'Thread',
  props: {
    eventId: String,
  },
  components: {
    Navbar,
    // Comment,
  },
  data() {
    return {
      user: {
        id: '112000289774224950540',
        name: 'John Smith',
        locationId: 'd58940f2-6c45-4087-b6f5-fe1fba5916e0',
        locationName: 'Piscataway, NJ',
        avatarUrl: "https://lh3.googleusercontent.com/a-/AOh14GifleDlpT9vCWEu6YGWY8JMYPi940Bz-GkAjeWltg=s96-c"
      },
      event: {
        id: '7aa791ac-9b06-41c3-b6e3-c9e4d058fcb7',
        name: 'Park Spring Cleaning',
        date: 'Sunday, May 1',
        address: 'Forrester Park',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
      },
      comments: [
        {
          id: 'abc',
          userId: '112000289774224950540',
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
          userId: '112000289774224950540',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          createdAt: '2021-04-11T19:00:35.802Z',
        },
      ],
      addingComment: false,
      editingComment: false,
      commentText: '',
    };
  },
  methods: {
    async getUser() {
      console.log(`fetching user (id=${this.authUserId})`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/user/${this.authUserId}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.user = data.info;
    },
    async getEvent() {
      console.log(`fetching event (event=${this.eventId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/events/${this.eventId}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.event = data.event;
    },
    async getComments() {
      console.log(`fetching comments (event=${this.eventId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/thread/${this.eventId}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.comments = data.comments;
    },
    async postComment() {
      console.log(`posting comment (event=${this.eventId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + '/comment';
      const comment = {
        eventId: this.eventId,
        text: this.commentText,
        userId: this.user.id,
        userName: this.user.name,
        avatarUrl: this.user.avatarUrl // TODO: what if the user's avatar changes after the post?
      }
      const { data } = await axios.post(url, JSON.stringify(comment), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      this.addingComment = false;
      this.commentText = '';
      this.comments.push(data.comment);
      console.log('done.');
      console.log('posted comment:', data.comment);
    },
    async deleteComment(commentId) {
      console.log(`deleting comment (comment=${commentId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/comment/${commentId}`;
      const { data } = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // remove comment from comments array
      const index = this.comments.findIndex(comment => comment.id == commentId);
      this.comments.splice(index, 1);
      console.log('done.');
      console.log('deleted comment:', data.comment);
    },
    async updateLocation(selectedLocation) {
      if (selectedLocation != this.user.locationName) {
        console.log(`updating settings (location=${selectedLocation})...`);
        const token = await this.$auth.getTokenSilently();  // TODO: can we reuse the same token? Store in component data???
        const request = {
          locationId: selectedLocation.id,
          locationName: selectedLocation.name,
          name: this.user.name,
          avatarUrl: this.user.avatarUrl
        };
        const url = apiEndpoint + `/user/${this.user.id}`;
        const { data } = await axios.patch(url, request, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // send the access token through the Auth header
          }
        });
        // if succesful, update user locationId and locationName
        console.log('done.');
        this.user.locationId = selectedLocation.id;
        this.user.locationName = selectedLocation.name;
        console.log('updated user:', data.user);

        // TODO: else, indicate error
        // ...
        // console.log('done.');
      }
    }
  },
  computed: {
    loading () {
      return this.$auth.loading;
    },
    authUserId() {
      if (this.$auth.user) {
        return this.$auth.user.sub.split('|')[1];
      } else {
        return undefined
      }
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
    if (this.$auth.isAuthenticated) {
      await this.getUser();
      this.getEvent(this.eventId);
      this.getComments(this.eventId);
    }
  },
  watch: {
    async loading () {
      if (!this.loading & this.$auth.isAuthenticated) {
        console.log('this.$auth done loading');
        await this.getUser();
        this.getEvent(this.eventId);
        this.getComments(this.eventId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#comment-textarea {
  width: 100%;
  border-color: white;
}
#comment-textarea:focus, #comment-textarea:active {
  border-color: rgb(32, 203, 154);
}
// #comment-check {
//   color: white;
//   background-color: rgba(32, 203, 154);
// }
// #comment-check:focus, #comment-check:hover {
//   background-color: rgba(32, 203, 154, .8);
// }
</style>