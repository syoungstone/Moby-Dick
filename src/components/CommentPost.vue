<template>
  <div>
    <div class="comment">
      <header>
        <BaseProfilePicture
          style="float:left;"
          :imgSrc="comment.image"
          dimensions="40px"
        />
        <div style="float:left;">
          <h4 id="username">{{ comment.username }}</h4>
          <p id="timestamp">
            {{ months[myDate.getMonth()] }}
            {{ myDate.getDate() }},
            {{ myDate.getFullYear() }}
          </p>
        </div>
        <div style="clear:both;"></div>
      </header>
      <p>{{ comment.text }}</p>
      <footer>
        <div v-on:click="likeClick()">
          <BaseIcon
            class="base-icon"
            style="float:left;"
            name="thumbs-up"
            :selected="userLike"
            >{{ comment.likes }}</BaseIcon
          >
        </div>
        <div v-on:click="dislikeClick()">
          <BaseIcon
            class="base-icon"
            style="float:left;"
            name="thumbs-down"
            :selected="userDislike"
            >{{ comment.dislikes }}</BaseIcon
          >
        </div>
        <div v-on:click="showReply()">
          <BaseIcon class="base-icon" style="float:left;" name="corner-up-left"
            >Reply</BaseIcon
          >
        </div>
        <div
          v-if="
            this.currentUser.uid && this.comment.uid === this.currentUser.uid
          "
          v-on:click="deleteComment()"
        >
          <BaseIcon class="base-icon" style="float:right;" name="trash"
            >Delete</BaseIcon
          >
        </div>
        <div style="clear:both;"></div>
      </footer>
    </div>
    <div class="comment" id="replies" v-if="userReply">
      <CommentForm :loggedIn="loggedIn" :reply="true" />
      <CommentPost v-for="reply in comment.replies" :key="reply.key" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentForm from '@/components/CommentForm.vue'
export default {
  components: {
    CommentForm
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    loggedIn: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      userReply: false,
      myDate: new Date(this.comment.timestamp.seconds * 1000)
    }
  },
  methods: {
    likeClick() {
      if (this.loggedIn) {
        if (this.userDislike) {
          this.$store.dispatch('removeDislike', {
            id: this.comment.id,
            count: this.comment.dislikes
          })
        }
        if (this.userLike) {
          this.$store.dispatch('removeLike', {
            id: this.comment.id,
            count: this.comment.likes
          })
        } else {
          this.$store.dispatch('addLike', {
            id: this.comment.id,
            count: this.comment.likes
          })
        }
      }
    },
    dislikeClick() {
      if (this.loggedIn) {
        if (this.userLike) {
          this.$store.dispatch('removeLike', {
            id: this.comment.id,
            count: this.comment.likes
          })
        }
        if (this.userDislike) {
          this.$store.dispatch('removeDislike', {
            id: this.comment.id,
            count: this.comment.dislikes
          })
        } else {
          this.$store.dispatch('addDislike', {
            id: this.comment.id,
            count: this.comment.dislikes
          })
        }
      }
    },
    showReply() {
      if (this.loggedIn) this.userReply = !this.userReply
    },
    deleteComment() {
      this.$store.dispatch('deleteComment', { id: this.comment.id })
    }
  },
  computed: {
    ...mapState(['userLikes', 'userDislikes']),
    userLike() {
      return this.userLikes.includes(this.comment.id)
    },
    userDislike() {
      return this.userDislikes.includes(this.comment.id)
    }
  }
}
</script>

<style scoped>
.comment {
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(136, 143, 248, 0.075);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
}
.comment:hover {
  transform: scale(1.01);
}
#replies {
  margin-left: 70px;
}
#username {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 0px;
}
#timestamp {
  margin-left: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 10pt;
}
.base-icon {
  margin-right: 10px;
  cursor: default;
}
</style>
