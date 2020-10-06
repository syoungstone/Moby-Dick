<template>
  <div v-if="loggedIn">
    <h1>Your Profile</h1>
    <BaseProfilePicture
      :imgSrc="userProfile.image"
      :userKey="userProfile.key"
      dimensions="100px"
    />
    <h2>{{ userProfile.username }}</h2>
    <h3>{{ userProfile.email }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userProfile', 'loggedIn'])
  }
}
</script>
