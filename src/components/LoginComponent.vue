<template>
  <div>
    <div id="login">
      <p class="error-message" v-if="this.loginErrorMessage">
        {{ loginErrorMessage }}
      </p>
      <form @submit.prevent>
        <div>
          <input
            type="text"
            placeholder="Email"
            id="email1"
            v-model.trim="credentials.email"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            id="password1"
            v-model.trim="credentials.password"
          />
        </div>
        <button @click="login()" class="button">Log In</button>
        <router-link :to="{ name: 'CreateAccount' }"
          >Create Account</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['loginErrorMessage'])
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.credentials.email,
        password: this.credentials.password
      })
    }
  }
}
</script>

<style scoped>
input,
button {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
.error-message {
  color: rgb(216, 0, 0);
}
</style>
