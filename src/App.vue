<template>
  <div id="app">
    <SiteHeader />
    <NavBar :loggedIn="loggedIn" id="nav" />
    <router-view :loggedIn="loggedIn" :currentUser="currentUser" />
  </div>
</template>

<script src="https://unpkg.com/feather-icons"></script>
<script>
import NavBar from '@/components/NavBar.vue'
import SiteHeader from '@/components/SiteHeader.vue'

export default {
  components: {
    NavBar,
    SiteHeader
  },
  data() {
    return {
      loggedIn: false,
      currentUser: null
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
  max-width: 70em;
  margin: 0em auto;
  padding: 30px;
  background-color: #ffffff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
