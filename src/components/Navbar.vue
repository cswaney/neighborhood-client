<template>
<div>
  <div id="nav" class="uk-navbar-container tm-navbar-container" uk-sticky="media: 960">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        
        <div class="uk-navbar-left">
          <router-link class="uk-navbar-item uk-logo" to="/">
            <!-- <img src="../assets/images/logo.png" uk-svg width="70" height="50"/> -->
            <!-- <span class="uk-margin-small-right" uk-icon="settings"></span> -->
            Neighborhood
          </router-link>
        </div>

        <div v-if="!$auth.loading" class="uk-navbar-center">
          <div v-if="$auth.isAuthenticated" class="uk-navbar-item">

            <a class="uk-icon-button" href="#modal-sections" uk-icon="plus" uk-toggle style="color: black;"></a>
            <div id="modal-sections" uk-modal>
              <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <!-- <div class="uk-modal-header">
                  <h2 class="uk-modal-title">New Event</h2>
                </div> -->
                <div class="uk-modal-body">
                  <form>
                    <fieldset class="uk-fieldset">
                      <div class="uk-margin">
                        <label class="uk-form-label" for="name">Event</label>
                        <div class="uk-form-controls">
                          <input class="uk-input" id="name" type="text" placeholder="My awesome event">
                        </div>
                      </div>
                      <div class="uk-margin">
                        <label class="uk-form-label" for="date">Date</label>
                        <div class="uk-form-controls">
                          <input class="uk-input" id="date" type="text" placeholder="MM/DD/YYYY">
                        </div>
                      </div>
                      <div class="uk-margin">
                        <label class="uk-form-label" for="address">Address</label>
                        <div class="uk-form-controls">
                          <input class="uk-input" id="address" type="text" placeholder="Street, City, State, Zip">
                        </div>
                      </div>
                      <div class="uk-margin">
                        <label class="uk-form-label" for="link">Link</label>
                        <div class="uk-form-controls">
                          <input class="uk-input" id="link" type="text" placeholder="http://www.myawesomeevent.com">
                        </div>
                      </div>
                      <div class="uk-margin">
                        <label class="uk-form-label" for="attachment">Attachment</label>
                        <div class="uk-form-controls">
                          <div uk-form-custom="target: true">
                            <input id="attachment" type="file">
                            <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                  <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                  <button class="uk-button uk-button-primary" type="button" style="background: rgb(32,203,154);">Create</button>
                </div>
              </div>
            </div>

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

            <a href="" class="uk-icon-button uk-margin-small-left" uk-icon="cog" style="color: black;"></a>
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
                  <a class="dropdown-item" href="#" @click="logout">
                    <span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout
                  </a>
                </li>
              </ul>
            </div>

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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#nav:not(.uk-navbar-transparent) {
  background: rgb(0, 0, 0);
}
#dropdown {
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
#user {
  text-transform: none;
}
</style>
