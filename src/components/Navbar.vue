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
            
            <button
              id="user"
              class="uk-button uk-button-default tm-button-default uk-icon"
              type="button">{{ $auth.user.email }}
            </button>
            <!-- TODO: make a user panel -->
            <div id="dropdown" uk-dropdown="mode: click; pos: bottom-justify">
              <ul class="uk-nav uk-dropdown-nav">
                <li>
                  <router-link v-bind:to="'/account'" class="dropdown-item">
                    <span class="uk-margin-small-right" uk-icon="user"></span>Account
                  </router-link>
                </li>
                <li>
                  <router-link v-bind:to="'/settings'" class="dropdown-item">
                    <span class="uk-margin-small-right" uk-icon="settings"></span>Settings
                  </router-link>
                </li>
                <li class="uk-nav-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">
                    <span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout
                  </a>
                </li>
              </ul>
            </div>

            <a href="#" class="uk-icon-button uk-margin-small-left" uk-icon="cog" style="color: black;"></a>
            <!-- TODO: make a settings panel -->
            <div id="dropdown" uk-dropdown="mode: click; pos: bottom-justify">
              <ul class="uk-nav uk-dropdown-nav">
                <li>
                  <router-link v-bind:to="'/account'" class="dropdown-item">
                    <span class="uk-margin-small-right" uk-icon="user"></span>Account
                  </router-link>
                </li>
                <li>
                  <router-link v-bind:to="'/settings'" class="dropdown-item">
                    <span class="uk-margin-small-right" uk-icon="settings"></span>Settings
                  </router-link>
                </li>
                <li class="uk-nav-divider"></li>
                <li>
                  <a class="dropdown-item" href="#">
                    <span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout
                  </a>
                </li>
              </ul>
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
  data() {
    return {
      pages: navigation.pages,
    };
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#dropdown {
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
#user {
  text-transform: none;
}
</style>
