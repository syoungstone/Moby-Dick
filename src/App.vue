<template>
  <div id="app">
    <div class="container">
      <SiteHeader />
      <NavBar :loggedIn="loggedIn" id="nav" />
      <router-view
        :loggedIn="loggedIn"
        :currentUser="userProfile"
        :comments="comments"
      />
    </div>
  </div>
</template>

<script src="https://unpkg.com/feather-icons"></script>
<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import SiteHeader from '@/components/SiteHeader.vue'

export default {
  components: {
    NavBar,
    SiteHeader
  },
  computed: {
    ...mapState(['userProfile', 'comments']),
    loggedIn() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 60em;
  margin: 0em auto;
  padding: 30px;
  background-color: #ffffff;
}

.container {
  max-width: 50em;
  margin: 0em auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
