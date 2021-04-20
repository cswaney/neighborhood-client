<template>
  <div class="uk-section uk-section-default uk-section-small">
    <div class="uk-container uk-container-small">

      <img src="../assets/images/logo.png" class="uk-align-center uk-margin-remove-bottom" uk-svg width="210" height="150"/>
      <h1 id="banner" class="uk-heading-small uk-text-center uk-margin-remove-top">{{ user.district }}</h1>

      <!-- <p>{{ $auth.user }}</p> -->

      <!-- <event v-for="thread in threads" :key="thread.id" v-bind:event="thread"></event> -->

      <ul uk-accordion="multiple: false;">
        <li v-for="thread in threads" v-bind:key="thread.id">
            <a class="uk-accordion-title" href="#">{{ thread.headline }}</a>
            <div class="uk-accordion-content">
                <ul class="uk-list">
                  <li><b>What</b> {{ thread.description }} <router-link v-bind:to="'/thread/' + thread.id" class="uk-button uk-button-text">Details</router-link></li>
                  <li><b>When</b> {{ thread.date }}</li>
                  <li><b>Where</b> {{ thread.location }}</li>
                  <!-- <li><router-link v-bind:to="'/thread/' + thread.id" class="uk-button uk-button-text">Discussion</router-link></li> -->
                </ul>
            </div>
        </li>
      </ul>

      <ul class="uk-pagination uk-flex-center" uk-margin>
        <li><a href="#"><span uk-pagination-previous></span></a></li>
        <li><a href="#">1</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li class="uk-active"><span>7</span></li>
        <li><a href="#">8</a></li>
        <li><a href="#">9</a></li>
        <li><a href="#">10</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">20</a></li>
        <li><a href="#"><span uk-pagination-next></span></a></li>
      </ul>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import Event from '@/components/Event.vue'; // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    // Event,
  },
  data() {
    return {
      user: {
        id: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
        name: 'John Smith',
        district: 'Piscataway, NJ',
      },
      threads: [
        {
          id: '101dcc9e-903d-4275-9fb8-dfaf5d999208',
          location: '500 7th Ave',
          createdAt: '2021-04-11T19:51:04.734Z',
          date: 'Sunday, May 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          headline: 'Bake Sale'
        },
        {
          id: '084c143f-2656-46d7-9e82-e77edc1c1d92',
          location: 'Forrester Park',
          createdAt: '2021-04-11T20:37:41.849Z',
          date: 'Saturday, May 7',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
          headline: 'Park Spring Clean',
        },
      ],
    };
  },
  methods: {
    async getUser() {
      console.log(`fetching user (id=${this.$auth.user.id}`); // TODO: ?
      const token = await this.$auth.getTokenSilently();
      const url = 'http:127.0.0.1:5000/api/user/'; // Uses user from auth token
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      this.user = data;
    },
    async getThreads() {
      console.log(`fetching threads (district=${this.user.district})...`);
      const token = await this.$auth.getTokenSilently();
      const url = `http:127.0.0.1:5000/api/threads/${this.user.district}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.threads = data;
    },
  },
  created() {
    console.log('created view: Home');
    // this.getUser();
    // this.getThreads();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
b {
  font-weight: 700;
  font-size: 16px;
}
#banner {
  font-family: Niconne;
  font-size: 48px;
}
</style>