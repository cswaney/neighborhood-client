<template>
  <div id="root">

    <Navbar v-bind:userLocationName="userLocationName" v-on:update-location="updateLocation"/>
    
    <div class="uk-section uk-section-default uk-section-small">
      <div class="uk-container uk-container-small">

        <div v-show="!loadingData">

          <div id="home" v-if="$auth.isAuthenticated & user != undefined">
            <div class="uk-text-center">
              <h1 class="uk-heading-small uk-margin-small-bottom">{{ event.name }}</h1>
              <h4 class="uk-margin-remove">{{ event.date }} @ {{ event.address }}</h4>
              <img class="uk-border-rounded uk-align-center" v-show="event.attachmentUrl" :src="event.attachmentUrl" width="240" height="240">
              <img class="uk-border-rounded uk-align-center" v-show="!event.attachmentUrl" src="../assets/images/placeholder.jpg" width="120" height="120">
              <p>{{ event.description }}</p>
            </div>

            <h3>Discussion</h3>
            <ul class="uk-comment-list">
                <li>
                    <article v-if="comments.length > 0" class="uk-comment uk-visible-toggle" tabindex="-1">
                        <header class="uk-comment-header uk-position-relative">
                            <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                <div class="uk-width-auto">
                                    <img class="uk-border-rounded" :src="comments[0].avatarUrl" width="80" height="80" alt="">
                                </div>
                                <div class="uk-width-expand">
                                    <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ comments[0].userName }}</a></h4>
                                    <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">{{ comments[0].createdAt}}</a></p>
                                </div>
                            </div>
                            <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                              <button v-show="user.id == comments[0].userId" class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="trash" v-on:click="deleteComment(comments[0].id)"></button>
                              <button v-show="user.id == comments[0].userId" class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="pencil" v-on:click="toggleEditingComment(comments[0].id)"></button>
                              <a v-show="!(editingComment == comments[0].id)" class="uk-icon-button tm-icon-button" href="#comment-textarea" uk-icon="reply" uk-scroll v-on:click="addingComment=true"></a>
                              <button
                                v-show="editingComment == comments[0].id"
                                class="uk-icon-button tm-icon-button tm-button uk-margin-small-left"
                                v-bind:class="{'uk-disabled': !commentText, 'tm-button-primary': commentText}"
                                href="#"
                                uk-icon="check"
                                v-on:click="updateComment(comments[0].id)">
                              </button>
                            </div>
                        </header>
                        <div v-show="!(editingComment == comments[0].id)" class="uk-comment-body">
                            <p>{{ comments[0].text }}</p>
                        </div>
                        <div v-show="editingComment == comments[0].id" class="uk-comment-body">
                            <textarea
                              class="uk-textarea tm-textarea uk-form-width-large uk-border-rounded"
                              rows="4"
                              v-bind:placeholder="comments[0].text"
                              v-model="commentText">
                            </textarea>
                        </div>
                    </article>
                    <article v-if="comments.length == 0" class="uk-comment uk-visible-toggle" tabindex="-1">
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
                              <button class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="close" v-on:click="resetCommentText"></button>
                              <button
                                class="uk-icon-button tm-icon-button"
                                v-bind:class="{'uk-disabled': !commentText, 'tm-button-primary': commentText}"
                                href="#"
                                uk-icon="check"
                                v-on:click="postComment">
                              </button>
                            </div>
                        </header>
                        <div class="uk-comment-body">
                            <textarea id="comment-textarea" class="uk-textarea tm-textarea uk-form-width-large uk-border-rounded" rows="4" placeholder="Start the conversation!" v-model="commentText"></textarea>
                        </div>
                    </article>
                    <ul v-if="comments.length > 0" class="uk-margin-medium-top">
                        <li v-for="comment in replies" :key="comment.commentId" class="uk-margin-small-top">
                            <article class="uk-comment uk-comment-primary uk-visible-toggle uk-border-rounded" tabindex="-1">
                                <header class="uk-comment-header uk-position-relative">
                                    <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                        <div class="uk-width-auto">
                                            <img class="uk-border-rounded" :src="comment.avatarUrl" width="80" height="80" alt="">
                                        </div>
                                        <div class="uk-width-expand">
                                            <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ comment.userName }}</a></h4>
                                            <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">{{ comment.createdAt }}</a></p>
                                        </div>
                                    </div>
                                    <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                                      <button v-show="user.id == comment.userId" class="uk-icon-button tm-icon-button uk-margin-small-right" uk-icon="trash" v-on:click="deleteComment(comment.id)"></button>
                                      <button v-show="user.id == comment.userId" class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="pencil" v-on:click="toggleEditingComment(comment.id)"></button>
                                      <a v-show="!(editingComment == comment.id)" class="uk-icon-button tm-icon-button" href="#comment-textarea" uk-icon="reply" uk-scroll v-on:click="addingComment=true"></a>
                                      <button
                                        v-show="editingComment == comment.id"
                                        class="uk-icon-button tm-icon-button tm-button"
                                        v-bind:class="{'uk-disabled': !commentText, 'tm-button-primary': commentText}"
                                        href="#"
                                        uk-icon="check"
                                        v-on:click="updateComment(comment.id)">
                                      </button>
                                    </div>
                                </header>
                                <div v-show="!(editingComment == comment.id)" class="uk-comment-body">
                                    <p>{{ comment.text }}</p>
                                </div>
                                <div v-show="editingComment == comment.id" class="uk-comment-body">
                                    <textarea
                                      class="uk-textarea tm-textarea uk-form-width-large uk-border-rounded"
                                      rows="4"
                                      v-bind:placeholder="comment.text"
                                      v-model="commentText">
                                    </textarea>
                                </div>
                            </article>
                        </li>
                        <li v-show="addingComment" class="uk-margin-small-top">
                            <article class="uk-comment uk-comment-primary uk-visible-toggle uk-border-rounded" tabindex="-1">
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
                                      <button
                                        class="uk-icon-button tm-icon-button tm-button"
                                        v-bind:class="{'uk-disabled': !commentText, 'tm-button-primary': commentText}"
                                        href="#"
                                        uk-icon="check"
                                        v-on:click="postComment"></button>
                                    </div>
                                </header>
                                <div class="uk-comment-body">
                                    <textarea id="comment-textarea" class="uk-textarea tm-textarea uk-form-width-large uk-border-rounded" rows="4" placeholder="Add comment..." v-model="commentText"></textarea>
                                </div>
                            </article>
                        </li>
                    </ul>
                </li>
            </ul>
          </div>

          <!-- <div id="setup" v-if="$auth.isAuthenticated & user == undefined">

                  <a class="uk-icon-button tm-icon-button uk-invisible uk-disabled" href="#" uk-icon="plus" uk-toggle></a>

                  <img src="../assets/images/logo.png" class="uk-align-center uk-margin-remove-bottom" uk-svg width="280" height="200"/>
                  <button class="uk-button tm-button-primary uk-position-center uk-margin-xlarge-top" uk-toggle>Setup Account</button>
                  <div id="settings-dropdown" class="tm-dropdown" uk-dropdown="mode: click; pos: top-center;">
                      <form class="uk-form-horizontal">
                          <div class="uk-margin-small">
                            <span class="uk-margin-small-right" uk-icon="user"></span>
                            <input class="uk-input uk-form-width-medium tm-input" type="text" placeholder="Name" v-model="inputName">
                          </div>
                          <div class="uk-margin-small uk-margin-remove-bottom">
                              <span class="uk-margin-small-right" uk-icon="location"></span>
                              <select class="uk-select uk-form-width-medium tm-select uk-border-rounded" v-model="selectedLocationName">
                                  <option v-for="location in locations" :key="location.id">{{ location.name }}</option>
                              </select>                       
                          </div>
                          <div class="uk-margin-small uk-margin-remove-bottom">
                              <div uk-form-custom="target: true">
                                  <span class="uk-margin-small-right" uk-icon="file-text"></span>
                                  <input type="file" v-on:change="setAttachedFile">
                                  <input class="uk-input uk-form-width-medium uk-border-rounded" type="text" placeholder="Attachment" disabled>
                              </div>
                          </div>
                          <hr class="uk-margin-small">
                          <div class="uk-margin-small uk-text-right">
                              <a class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="close" uk-toggle="target: #settings-dropdown;"></a>
                              <a class="uk-icon-button tm-icon-button tm-button-primary" uk-icon="check" v-on:click="createUser"></a>
                          </div>
                      </form>
                  </div>

          </div> -->

          <div id="login" v-if="!$auth.isAuthenticated" v-show="!$auth.loading">
            <a class="uk-icon-button tm-icon-button uk-invisible uk-disabled" href="#" uk-icon="plus" uk-toggle></a>
            <img src="../assets/images/logo.png" class="uk-align-center uk-margin-remove-bottom" uk-svg width="280" height="200"/>
          </div>

        </div>

        <span v-show="loadingData" class="uk-position-center" uk-spinner="ratio: 3"></span>

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
        // id: '112000289774224950540',
        // name: 'John Smith',
        // locationId: 'd58940f2-6c45-4087-b6f5-fe1fba5916e0',
        // locationName: 'Piscataway, NJ',
        // avatarUrl: "https://lh3.googleusercontent.com/a-/AOh14GifleDlpT9vCWEu6YGWY8JMYPi940Bz-GkAjeWltg=s96-c"
      },
      userLocationName: '',

      event: {
        // id: '7aa791ac-9b06-41c3-b6e3-c9e4d058fcb7',
        // name: 'Park Spring Cleaning',
        // date: 'Sunday, May 1',
        // address: 'Forrester Park',
        // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
      },

      comments: [
        // {
        //   id: 'abc',
        //   userId: '112000289774224950540',
        //   userName: 'John Smith',
        //   threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
        //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
        //   createdAt: '2021-04-11T19:02:51.909Z',
        // },
        // {
        //   id: 'efg',
        //   userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
        //   userName: 'John Smith',
        //   threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
        //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
        //   createdAt: '2021-04-11T19:00:35.802Z',
        // },
        // {
        //   id: 'hij',
        //   userId: '112000289774224950540',
        //   userName: 'John Smith',
        //   threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
        //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
        //   createdAt: '2021-04-11T19:00:35.802Z',
        // },
      ],

      addingComment: false,
      editingComment: false,
      commentText: '',

      loadingData: false
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
      // Update local data if user is found
      if (data.info) {
        this.user = data.info;
        this.userLocationName = data.info.locationName;
      } else {
        this.user = undefined
      }
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
    async getData() {
      this.getUser();
      this.getEvent();
      this.getComments();
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
    async updateComment(commentId) {
      console.log(`updating comment (comment=${commentId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/comment/${commentId}`;
      const request = {
        text: this.commentText
      };
      const { data } = await axios.patch(url, JSON.stringify(request), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // update comment locally on success
      const index = this.comments.findIndex(comment => comment.id == commentId);
      this.comments[index].text = this.commentText;
      this.commentText = '';
      this.editingComment = false;
      console.log('done.');
      console.log('updated comment:', data.comment);
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
        this.userLocationName = selectedLocation.name;
        console.log('updated user:', data.user);

        // TODO: else, indicate error
        // ...
        // console.log('done.');

        // Fetch new location data
        this.getThreads();
      }
    },
    resetCommentText() {
      this.commentText = '';
    },
    toggleEditingComment(id) {
      if (this.editingComment) {
        this.editingComment = false;
      } else {
        this.editingComment = id;
      }
    },
    timeSince(date) {
      const now = new Date();
      // TODO!
    },
    wait() {
      return new Promise(resolve => setTimeout(resolve, 5000));
    },
  },
  computed: {
    loadingAuth () {
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
      this.loadingData = true;
      console.log('loading...')
      await this.getData(); // TODO: fix await!
      await this.wait();
      console.log('done.')
      this.loadingData = false;
    }
  },
  watch: {
    async loadingAuth () {
      if (!this.loadingAuth & this.$auth.isAuthenticated) {
        console.log('this.$auth done loading');
        this.loadingData = true;
        console.log('loading...')
        await this.getData(); // TODO: fix await!
        await this.wait();
        console.log('done.')
        this.loadingData = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tm-button-primary {
    color: white;
    background-color: rgb(32, 203, 154);
}
.tm-button-primary:hover, .tm-button-primary:focus {
    background-color: rgba(32, 203, 154, .8);
}
.tm-textarea {
  width: 100%;
  border-color: white;
}
.tm-textarea:focus, .tm-textarea:active {
  border-color: rgb(32, 203, 154);
}
</style>