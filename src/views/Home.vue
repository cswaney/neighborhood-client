<template>
  <div>
    <!-- Logo & Title -->
    <!-- <img alt="Vue logo" src="../assets/images/logo.png"> -->

    <!-- <Navbar/> -->

    <!-- <Navbar/> -->
    <Example/>
    <HelloWorld msg='Welcome to Your Vue.js + TypeScript App'/>
    <p>{{ user.id }}</p>
    <p>{{ user.name }}</p>
    <p>{{ user.district }}</p>

    <!-- List of Events -->
    <!-- Event component has event info and thread preview dropdown... -->
  </div>
</template>

<script>
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';
import Example from '@/components/Example.vue';
// import Event from '@/components/Event.vue'; // @ is an alias to /src
// import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Example,
    HelloWorld,
    // Event,
    // Navbar,
  },
  data: function () {
    return {
      user: {
        id: 'eb5f5b78-82a9-4a02-8e75-7b0cc7f271df',
        name: 'John Smith',
        district: 'Tribeca, NY',
      },
      threads: [
        {
          id: '101dcc9e-903d-4275-9fb8-dfaf5d999208',
          district: 'Tribeca, NY',
          createdAt: '2021-04-11T19:51:04.734Z',
        },
        {
          id: '084c143f-2656-46d7-9e82-e77edc1c1d92',
          district: 'Tribeca, NY',
          createdAt: '2021-04-11T20:37:41.849Z',
        },
      ],
    }
  },
  methods: {
    async getUser() {
      console.log(`fetching user (id=${this.$auth.user.id}`); // TODO: ?      
      const token = await this.$auth.getTokenSilently();
      const url = `http:127.0.0.1:5000/api/user/`; // Uses user from auth token
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
  created: function () {
    console.log('created view: Home');
    this.getUser();
    this.getThreads();
  },
};
</script>
