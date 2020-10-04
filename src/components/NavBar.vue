<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Blog</router-link> |
    <router-link :to="{ name: 'Attributions' }">Attributions</router-link> |
    <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    <router-link :to="{ name: 'CreateAccount' }">Create Account</router-link> |
    <router-link v-if="!loggedIn" :to="{ name: 'Login' }">Login</router-link>
    <router-link id="logout" v-else :to="{ name: 'Home' }">Logout</router-link>
  </nav>
</template>

<script>
export default {
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
#logout.router-link-exact-active {
  color: #2c3e50;
}
</style>
