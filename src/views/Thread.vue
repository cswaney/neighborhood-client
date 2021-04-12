<template>
  <div>
    <!-- Logo & Title -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>{{ id }}</h1>
    <!-- List of comments -->
    <!-- <Comment v-for=.../> -->
  </div>
</template>

<script>
import axios from 'axios';
import Comment from '@/components/Comment.vue';  // @ is an alias to /src

export default {
  name: 'Thread',
  props: {
    id: String
  },
  components: {
    Comment,
  },
  data: function() {
    return {
      // id: '101dcc9e-903d-4275-9fb8-dfaf5d999208',  // TODO: pass as route property
      comments: [
        {
          userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          comment: 'Wow! This is brilliant!',
          timestamp: '2021-04-11T19:02:51.909Z'
        },
        {
          userId: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
          userName: 'John Smith',
          threadId: 'b8e93969-bf63-4519-bd73-8c3cf4efcf61',
          comment: 'Making a thread...',
          timestamp: '2021-04-11T19:00:35.802Z'
        }
      ]
    }
  },
  methods: {
    async getComments() {
      console.log(`fetching comments (id=${this.id})...`)
      const token = await this.$auth.getTokenSilently();
      const url = `http:127.0.0.1:5000/api/comments/${this.id}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`  // send the access token through the Auth header
        }
      });
      console.log('done.');
      this.comments = data;
    }
  },
  created: function () {
    console.log('created view: Thread');
    this.getComments();
  },
};
</script>
