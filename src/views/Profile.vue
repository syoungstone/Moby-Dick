<template>
  <div v-if="loggedIn">
    <h1>Your Profile</h1>
    <BaseProfilePicture
      :imgSrc="currentUser.image"
      :userKey="currentUser.key"
      dimensions="100px"
    />
    <h2>{{ currentUser.username }}</h2>
    <h3>{{ currentUser.email }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    loggedIn: {
      type: Boolean,
      required: true
    }
  }
}
</script>
