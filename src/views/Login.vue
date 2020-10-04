<template>
  <div>
    <h1>Login</h1>
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
        <button class="button">Log In</button>
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
  }
}
</script>

<style>
input,
button {
  padding: 10px;
  margin: 10px 0px;
}
button {
  margin-right: 10px;
}
</style>
