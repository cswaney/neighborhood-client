<template>
<div>
  <div id="nav" class="uk-navbar-container tm-navbar-container" uk-sticky="media: 960">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        
        <div class="uk-navbar-left">
          <router-link class="uk-navbar-item uk-logo" to="/">
            <!-- <img class="uk-margin-small-right" src="../assets/images/logo-light.png" uk-svg width="45" height="45"/> -->
            Neighborhood
          </router-link>
        </div>

        <div v-if="!$auth.loading" class="uk-navbar-center">
          <div v-if="$auth.isAuthenticated" class="uk-navbar-item">

          </div>
        </div>
        
        <div v-if="!$auth.loading" class="uk-navbar-right">

          <div v-if="!$auth.isAuthenticated" class="uk-navbar-item">
            <a class="uk-button uk-button-default tm-button-default uk-icon" @click="login">Login</a>
          </div>

          <div v-if="$auth.isAuthenticated" class="uk-navbar-item">
            
            <img
              class="uk-border-circle uk-margin-small-right"
              :src="avatarUrl"
              width="36"
              height="36"
              alt=""
            >
            <button
              id="user"
              class="uk-button uk-button-default tm-button-default uk-icon uk-disabled"
              type="button">
                {{ $auth.user.email }}
            </button>

            <a href="#" class="uk-icon-button uk-margin-small-left" uk-icon="location" style="color: black;"></a>
            <div id="update-location-navbar-dropdown" uk-dropdown="mode: click; pos: bottom-center;">
                <form class="uk-form-horizontal">
                    <div class="uk-margin-small uk-margin-remove-bottom">
                        <span class="uk-margin-small-right" uk-icon="location"></span>
                        <select class="uk-select tm-select uk-form-width-medium" v-model="selectedLocationName">
                            <option v-for="location in locations" :key="location.id">{{ location.name }}</option>
                        </select>                       
                    </div>
                    <hr class="uk-margin-small">
                    <div class="uk-margin-small uk-text-right">
                        <a class="uk-icon-button tm-icon-button uk-margin-small-right" href="#" uk-icon="close" uk-toggle="target: #update-location-navbar-dropdown;"></a>
                        <a
                          id="settings-check"
                          class="uk-icon-button tm-icon-button tm-button-primary"
                          uk-icon="check"
                          uk-toggle="target: #update-location-navbar-dropdown;"
                          v-on:click="$emit('update-location', selectedLocation)">
                        </a>
                    </div>
                </form>
            </div>

            <a
              href="#"
              class="uk-icon-button uk-margin-small-left"
              uk-icon="sign-out"
              style="color: black;"
              @click="logout">
            </a>

          </div>

        </div>

      </nav>
    </div>
  </div>
</div>
</template>

<script>
import navigation from '@/navigation.json';

export default {
  name: 'Navbar',
  props: {
    // user: Object

    // userId: String,
    // userName: String,
    // userLocationId: String,
    userLocationName: String,
    // userAvatarUrl: String
  },
  data() {
    return {
      locations: navigation.locations,
      selectedLocationName: this.userLocationName,
    };
  },
  computed: {
    avatarUrl() {
      return this.$auth.user.picture;
    },
    selectedLocationId() {
      if (this.selectedLocationName) {
        return this.locations.find(loc => loc.name == this.selectedLocationName).id;
      } else {
        return '';
      }
    },
    selectedLocation() {
      return {
        id: this.selectedLocationId,
        name: this.selectedLocationName
      }
    }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    }
  },
  watch: {
    userLocationName() {
      this.selectedLocationName = this.userLocationName;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#dropdown {
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
#update-location-navbar-dropdown {
  border-radius: 10px;
  padding-top: 30px;
  padding-bottom: 5px;
}
#user {
  text-transform: none;
}
.tm-button-primary {
    color: white;
    background-color: rgb(32, 203, 154);
}
.tm-button-primary:hover, .tm-button-primary:focus {
    background-color: rgba(32, 203, 154, .8);
}
.tm-select:active, .tm-select:focus {
  border-color: rgb(32, 203, 154);
}
</style>
