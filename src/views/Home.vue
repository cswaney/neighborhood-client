<template>
  <div class="uk-section uk-section-default uk-section-small">
    <div class="uk-container uk-container-small">

      <img src="../assets/images/logo.png" class="uk-align-center uk-margin-remove-bottom" uk-svg width="210" height="150"/>
      <h1 id="banner" class="uk-heading-small uk-text-center uk-margin-remove-top">{{ user.locationName }}</h1>

      <!-- <p>{{ $auth.user }}</p> -->

      <!-- <event v-for="thread in threads" :key="thread.id" v-bind:event="thread"></event> -->

      <ul uk-accordion="multiple: false;">
        <li v-for="thread in threads" v-bind:key="thread.id">
            <a class="uk-accordion-title" href="#">{{ thread.name }}</a>
            <div class="uk-accordion-content">
                <ul class="uk-list">
                  <li><b>What</b> {{ thread.description }} <router-link v-bind:to="'/thread/' + thread.id" class="uk-button uk-button-text">Details</router-link></li>
                  <li><b>When</b> {{ thread.date }}</li>
                  <li><b>Where</b> {{ thread.address }}</li>
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
import { apiEndpoint } from '../config';

export default {
  name: 'Home',
  components: {
    // Event,
  },
  data() {
    return {
      user: {
        id: '112000289774224950540',
        name: 'John Smith',
        locationId: 'd58940f2-6c45-4087-b6f5-fe1fba5916e0',
        locationName: 'Piscataway, NJ',
      },
      threads: [
        {
          id: '101dcc9e-903d-4275-9fb8-dfaf5d999208',
          createdAt: '2021-04-11T19:51:04.734Z',
          locationId: 'd58940f2-6c45-4087-b6f5-fe1fba5916e0',
          name: 'Bake Sale',
          date: 'Sunday, May 1',
          address: '500 7th Ave',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
        },
        {
          id: '084c143f-2656-46d7-9e82-e77edc1c1d92',
          createdAt: '2021-04-11T20:37:41.849Z',
          locationId: 'd58940f2-6c45-4087-b6f5-fe1fba5916e0',
          name: 'Park Spring Clean',
          date: 'Saturday, May 7',
          address: 'Forrester Park',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis maximus metus. Suspendisse sed luctus lorem. Nullam vel est et augue sodales dapibus. Sed sed nisi vitae enim dapibus vulputate vel vel tellus. Aliquam magna nunc, porttitor vel ipsum at, mollis ultricies felis. Etiam feugiat velit non augue mollis laoreet. In volutpat non neque vel tempor.',
        },
      ],
    };
  },
  computed: {
    loading () {
      return this.$auth.loading;
    },
    authUserId() {
      return this.$auth.user.sub.split('|')[1];
    }
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
    async getThreads() {
      console.log(`fetching threads (location=${this.user.locationId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + `/events/location/${this.user.locationId}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      this.threads = data.events;
    },
  },
  async created() {
    console.log(`created view: Home`);
    if (!this.loading) {
      await this.getUser();
      await this.getThreads();
    }
  },
  watch: {
    async loading () {
      if (!this.loading) {
        console.log('this.$auth done loading');
        await this.getUser();
        await this.getThreads();
      } else {
        console.log('this.$auth loading')
      }
    }
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