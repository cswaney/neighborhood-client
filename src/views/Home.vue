<template>
  <div class="uk-section uk-section-default uk-section-small">
    <div class="uk-container uk-container-small">

      <a class="uk-icon-button tm-icon-button" href="#" uk-icon="plus" uk-toggle></a>
      <div id="add-event-dropdown" uk-dropdown="mode: click; pos: bottom-center;">
          <form>
              <div class="uk-margin-small-bottom">
                  <input id="event-title-input" class="uk-input uk-form-width-medium" type="text" placeholder="Add event" v-model="title">
              </div>
              <div class="uk-margin-small">
                  <span class="uk-margin-small-right" uk-icon="clock"></span>
                  <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Date" v-model="date">
              </div>
              <div class="uk-margin-small">
                  <span class="uk-margin-small-right" uk-icon="location"></span>
                  <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Address" v-model="address">
              </div>
              <div class="uk-margin-small uk-margin-remove-bottom">
                  <span class="uk-margin-small-right" uk-icon="comment"></span>
                  <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Description" v-model="description">
              </div>
              <div class="uk-margin-small uk-margin-remove-bottom">
                  <div uk-form-custom="target: true">
                      <span class="uk-margin-small-right" uk-icon="file-text"></span>
                      <input type="file" v-on:change="setAttachment">
                      <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Attachment" disabled>
                  </div>
              </div>
              <hr class="uk-margin-small">
              <div class="uk-margin-small uk-text-right">
                  <a class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="close" uk-toggle="target: #add-event-dropdown;"></a>
                  <a id="event-check" class="uk-icon-button tm-icon-button" href="#" uk-icon="check" v-on:click="createEvent"></a>
              </div>
          </form>
      </div>

      <!-- <img src="../assets/images/logo.jpg" class="uk-align-center uk-margin-remove-bottom" uk-svg width="280" height="200"/> -->
      <img src="../assets/images/logo.png" class="uk-align-center uk-margin-remove-bottom" uk-svg width="280" height="200"/>
      <h1 id="banner" class="uk-heading-small uk-text-center uk-margin-remove-top uk-margin-medium-bottom">{{ user.locationName }}</h1>

      <!-- <p>{{ $auth.user }}</p> -->

      <!-- <event v-for="thread in threads" :key="thread.id" v-bind:event="thread"></event> -->

      <ul uk-accordion="multiple: true;">
        <li v-for="thread in threads" v-bind:key="thread.id">
            <a class="uk-accordion-title" href="#">
              
              {{ thread.name }}

              <a v-if="thread.userId == user.userId" class="uk-icon-button tm-icon-button uk-margin-small-left" href="#" uk-icon="pencil" uk-toggle></a>
              <div id="edit-event-dropdown" uk-dropdown="mode: click; pos: top-center;">
                  <form>
                      <div class="uk-margin-small-bottom">
                          <input id="event-title-input" class="uk-input uk-form-width-medium" type="text" :placeholder="thread.name" v-model="title">
                      </div>
                      <div class="uk-margin-small">
                          <span class="uk-margin-small-right" uk-icon="clock"></span>
                          <input id="event-input" class="uk-input uk-form-width-medium" type="text" :placeholder="thread.date" v-model="date">
                      </div>
                      <div class="uk-margin-small">
                          <span class="uk-margin-small-right" uk-icon="location"></span>
                          <input id="event-input" class="uk-input uk-form-width-medium" type="text" :placeholder="thread.address" v-model="address">
                      </div>
                      <div class="uk-margin-small uk-margin-remove-bottom">
                          <span class="uk-margin-small-right" uk-icon="comment"></span>
                          <input id="event-input" class="uk-input uk-form-width-medium" type="text" :placeholder="thread.description" v-model="description">
                      </div>
                      <div class="uk-margin-small uk-margin-remove-bottom">
                          <div uk-form-custom="target: true">
                              <span class="uk-margin-small-right" uk-icon="file-text"></span>
                              <input type="file" v-on:change="setAttachment">
                              <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Attachment" disabled>
                          </div>
                      </div>
                      <hr class="uk-margin-small">
                      <div class="uk-margin-small uk-text-right">
                          <a class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="close" uk-toggle="target: #edit-event-dropdown;"></a>
                          <a id="event-check" class="uk-icon-button tm-icon-button" href="#" uk-icon="check" v-on:click="updateEvent"></a>
                      </div>
                  </form>
              </div>

              <a v-if="thread.userId == user.userId" class="uk-icon-button tm-icon-button uk-margin-small-left" href="#" uk-icon="trash" uk-toggle></a>
              <div id="delete-event-dropdown" uk-dropdown="mode: click; pos: top-center;">
                  <form>
                      <div class="uk-margin-small">
                          <span class="uk-margin-small-right" uk-icon="warning"></span>
                          <!-- <input id="event-input" class="uk-input uk-form-width-medium" type="text" placeholder="Date"> -->
                          <p>Are you sure you want to delete this event?</p>
                      </div>
                      <hr class="uk-margin-small">
                      <div class="uk-margin-small uk-text-right">
                          <a class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="close" uk-toggle="target: #delete-event-dropdown;"></a>
                          <a id="event-check" class="uk-icon-button tm-icon-button" href="#" uk-icon="check" v-on:click="deleteEvent"></a>
                      </div>
                  </form>
              </div>
            </a>
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
      title: '',
      date: '',
      address: '',
      description: '',
      attachment: '',
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
    async createEvent() {
      console.log(`creating event (location=${this.user.locationId})...`);
      const token = await this.$auth.getTokenSilently();
      const url = apiEndpoint + '/events';
      const event = {
        name: this.title,
        description: this.description,
        locationId: this.user.locationId,
        locationName: this.user.locationName,
        address: this.address,
        date: this.date,
        userId: this.user.userId
      }
      const { data } = await axios.post(url, JSON.stringify(event), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // send the access token through the Auth header
        },
      });
      console.log('done.');
      console.log('created event:', data.event);
    },
    async updateEvent() {
      console.log('editing edit...');
    },
    async deleteEvent() {
      console.log('deleting edit...');
    },
    setAttachment(event) {
      console.log('setting attachment: ', event.target.files);
      this.attachment = event.target.files[0];
    }
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
  // font-family: Niconne;
  font-size: 48px;
  font-weight: 400;
}

#dropdown {
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
#add-event-dropdown, #edit-event-dropdown, #delete-event-dropdown {
  border-radius: 10px;
  padding-top: 30px;
  padding-bottom: 5px;
}
#event-title-input {
    width: 300px;
    font-size: 24px;
    border-left-color: white;
    border-right-color: white;
    border-top-color: white;
    /* border-bottom-color: rgb(32, 203, 154); */
    margin-bottom: 10px;
}
#event-title-input:active, #event-title-input:focus {
    width: 300px;
    border-left-color: white;
    border-right-color: white;
    border-top-color: white;
    border-bottom-color: rgb(32, 203, 154);
}
#event-input {
    border-left-color: white;
    border-right-color: white;
    border-top-color: white;
    border-bottom-color: white;
    /* border-bottom-color: rgb(32, 203, 154); */
}
#event-check {
  background-color: rgba(32, 203, 154, 0.2);
}
.uk-accordion-title::before {
  content: "";
  width: 1.4em;
  height: 1.4em;
  margin-left: 10px;
  float: right;
  background-image: url("../assets/icons/chevron-down.svg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.uk-open > .uk-accordion-title::before {
  background-image: url("../assets/icons/chevron-up.svg");
}
</style>