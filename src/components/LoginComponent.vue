<template>
  <div>
    <div id="login">
      <form>
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
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
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
</style>
