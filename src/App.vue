<template>
  <div id="app">
    <NavBar id="nav" />
    <h1 id="site-title">Moby Dick</h1>
    <router-view />
  </div>
</template>

<script src="https://unpkg.com/feather-icons"></script>
<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
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

#site-title {
  font-family: 'LibreBaskerville';
  font-size: 70px;
  margin: 0.25em 0em 0em 0em;
}
@font-face {
  font-family: 'LibreBaskerville';
  src: url('./assets/LibreBaskerville-Bold.ttf') format('ttf');
}
</style>
