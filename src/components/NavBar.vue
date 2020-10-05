<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Blog</router-link> |
    <router-link :to="{ name: 'Attributions' }">Attributions</router-link> |
    <router-link v-if="loggedIn" :to="{ name: 'Profile' }">Profile</router-link>
    <router-link v-else :to="{ name: 'CreateAccount' }"
      >Create Account</router-link
    >
    |
    <router-link v-if="!loggedIn" :to="{ name: 'Login' }">Login</router-link>
    <a id="logout" v-else :to="{ name: 'Home' }" @click="logout()">Logout</a>
  </nav>
</template>

<script>
export default {
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
#logout {
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}
</style>
