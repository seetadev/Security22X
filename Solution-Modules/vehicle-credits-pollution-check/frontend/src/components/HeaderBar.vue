<template>
  <div>
    <md-toolbar id="toolbar">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <h3 class="md-title">{{title}}</h3>
      </div>    
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-icon>how_to_reg</md-icon>
          <span class="md-list-item-text"><router-link to="/producer">Producer</router-link></span>
        </md-list-item>
        <md-list-item>
          <md-icon>swap_horiz</md-icon>
          <span class="md-list-item-text"><router-link to="/market">Market</router-link></span>
        </md-list-item>
        <md-list-item>
          <md-icon>account_balance_wallet</md-icon>
          <span class="md-list-item-text"><router-link to="/wallet">Wallet</router-link></span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: "headerbar",
  data() {
    return {
      title: "Renewable Energy Credits",
      inline: null,
      showNavigation: false,
    };
  },
  methods: {
    onClickPage(e) {
      this.$emit('clicked', e)
    },
  },
  computed: {
    ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
    ...mapState({
      authLoading: state => state.auth.status === 'loading',
      name: state => `${state.user.profile.title} ${state.user.profile.name}`,
    })
  },  
};
</script>

<style lang="scss" scoped>
.md-focused label {
  font-weight: 500;
}
#toolbar {
  position: fixed;
  z-index: 10;
  flex: 1;
}
#logo {
  width: 50px;
}
a {
    color: rgb(0, 96, 182);
    text-decoration: none;
}
a:hover 
{
  color:#00A0C6; 
  text-decoration:none; 
  cursor:pointer;  
}
</style>
