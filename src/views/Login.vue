<template>
  <div>
    <h1>Login</h1>
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
export default {
  components: {
    LoginComponent
  },
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
