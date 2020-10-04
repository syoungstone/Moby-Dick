<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Blog</router-link> |
    <router-link :to="{ name: 'Login' }">Login</router-link> |
    <router-link :to="{ name: 'CreateAccount' }">Create Account</router-link> |
    <router-link :to="{ name: 'Profile' }">Profile</router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped></style>
