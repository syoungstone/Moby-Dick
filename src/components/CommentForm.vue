<template>
  <div>
    <LoginComponent v-if="loginShow && !loggedIn" />
    <button v-else-if="!loggedIn" v-on:click="loginShow = true">
      Log In To Comment
    </button>
    <div v-else>
      <form @submit.prevent>
        <textarea v-model.trim="comment.text" rows="4" cols="50" />
        <div></div>
        <button
          @click="submitComment()"
          :disabled="comment.text === ''"
          class="button"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    },
    reply: {
      type: Boolean,
      required: true
    }
  },
  components: {
    LoginComponent
  },
  data() {
    return {
      loginShow: false,
      comment: {
        text: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'comments'])
  },
  methods: {
    submitComment() {
      if (!this.reply) {
        this.$store.dispatch('submitComment', { text: this.comment.text })
        this.comment.text = ''
      }
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
