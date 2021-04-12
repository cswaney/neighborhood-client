<template>
  <div class="uk-navbar-container tm-navbar-container" uk-sticky="media: 960">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">

        <div class="uk-navbar-left">
          <router-link class="uk-navbar-item uk-logo" to="/">
            <!-- <img src="../assets/images/logo.svg" uk-svg width="70" height="50"/> -->
          </router-link>
        </div>

        <div v-if="!$auth.loading" class="uk-navbar-right">
          <ul class="uk-navbar-nav uk-visible@m">
            <li v-for="(page,index) in pages" v-bind:key="index">
              <router-link v-bind:to="`/${page}`">{{ page }}</router-link>
            </li>
          </ul>

          <!-- <div class="uk-navbar-item uk-visible@m">
            <div v-if="!$auth.isAuthenticated" class="uk-navbar-item uk-visible@m">
              <a class="uk-button uk-button-default tm-button-default uk-icon" @click="login">Login</a>
            </div>
            <div v-if="$auth.isAuthenticated" class="uk-navbar-item uk-visible@m">
              <button class="uk-button uk-button-default tm-button-default uk-icon" type="button">{{ $auth.user.name }}</button>
              <div uk-dropdown="mode: click; pos: bottom-justify" style="border-radius: 15px; padding-top: 10px; padding-bottom: 10px;">
                <ul class="uk-nav uk-dropdown-nav">
                  <li>
                    <router-link v-bind:to="'/account'" class="dropdown-item"><span class="uk-margin-small-right" uk-icon="user"></span></router-link>
                  </li>
                  <li>
                    <router-link v-bind:to="'/settings'" class="dropdown-item"><span class="uk-margin-small-right" uk-icon="settings"></span></router-link>
                  </li>
                  <li class="uk-nav-divider"></li>
                  <li><a class="dropdown-item" href="#" @click="logout"><span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout</a></li>
                </ul>
              </div>
            </div>
          </div> -->
          <a class="uk-navbar-toggle uk-hidden@m" uk-navbar-toggle-icon href="#offcanvas" uk-toggle></a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import navigation from "@/navigation.json";

export default {
  name: 'Navbar',
  data: function() {
    return {
      pages: navigation.pages
    }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
