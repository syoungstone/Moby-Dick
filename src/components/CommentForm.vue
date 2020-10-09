<template>
  <div>
    <LoginComponent v-if="loginShow && !loggedIn" />
    <button v-else-if="!loggedIn" v-on:click="loginShow = true">
      Log In To Comment
    </button>
    <div v-else>
      <form @submit.prevent>
        <textarea v-model.trim="comment.text" rows="4" />
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
    reply: {
      type: Boolean,
      required: true
    },
    parentId: {
      type: String,
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
    ...mapState(['loggedIn'])
  },
  methods: {
    submitComment() {
      this.$store.dispatch('submitComment', {
        text: this.comment.text,
        reply: this.reply,
        parentId: this.parentId
      })
      this.comment.text = ''
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
textarea {
  width: 100%;
  max-width: 500px;
}
</style>
