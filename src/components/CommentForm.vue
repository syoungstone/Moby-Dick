<template>
  <div>
    <LoginComponent v-if="loginShow" />
    <button v-else-if="!loggedIn" v-on:click="loginShow = true">
      Log In To Comment
    </button>
    <div v-else>
      <textarea rows="4" cols="50" />
      <div></div>
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
export default {
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  components: {
    LoginComponent
  },
  data() {
    return {
      loginShow: false
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
</style>
