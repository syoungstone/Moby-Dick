<template>
  <div>
    <div id="comment">
      <header>
        <BaseProfilePicture
          style="float:left;"
          :imgSrc="comment.user.image"
          :userKey="comment.user.key"
          dimensions="40px"
        />
        <div style="float:left;">
          <h4 id="username">{{ comment.user.username }}</h4>
          <p id="timestamp">
            {{ months[comment.timestamp.getMonth()] }}
            {{ comment.timestamp.getDate() }},
            {{ comment.timestamp.getFullYear() }}
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
        <div v-on:click="userReply = !userReply">
          <BaseIcon class="base-icon" style="float:left;" name="corner-up-left"
            >Reply</BaseIcon
          >
        </div>
        <div style="clear:both;"></div>
      </footer>
    </div>
    <div id="replies">
      <CommentForm v-if="userReply" :loggedIn="loggedIn" />
      <CommentPost v-for="reply in comment.replies" :key="reply.key" />
    </div>
  </div>
</template>

<script>
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
      userLike: false,
      userDislike: false
    }
  },
  methods: {
    likeClick() {
      if (this.loggedIn) {
        if (this.userDislike) {
          this.userDislike = false
          this.comment.dislikes -= 1
        }
        if (this.userLike) {
          this.userLike = false
          this.comment.likes -= 1
        } else {
          this.userLike = true
          this.comment.likes += 1
        }
      }
    },
    dislikeClick() {
      if (this.loggedIn) {
        if (this.userLike) {
          this.userLike = false
          this.comment.likes -= 1
        }
        if (this.userDislike) {
          this.userDislike = false
          this.comment.dislikes -= 1
        } else {
          this.userDislike = true
          this.comment.dislikes += 1
        }
      }
    }
  }
}
</script>

<style scoped>
#comment {
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(136, 143, 248, 0.075);
}
#replies {
  margin-left: 30px;
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
