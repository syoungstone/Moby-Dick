<template>
  <div>
    <h1>{{ blogPost.title }}</h1>
    <h3>{{ blogPost.subheader }}</h3>
    <div id="author-container">
      <BaseProfilePicture
        style="float:left;"
        :imgSrc="blogPost.image"
        :userKey="blogPost.uid"
        dimensions="60px"
      />
      <div style="float:left;">
        <h4 id="author-name">{{ blogPost.username }}</h4>
        <p id="timestamp">
          {{ months[blogPost.timestamp.getMonth()] }}
          {{ blogPost.timestamp.getDate() }},
          {{ blogPost.timestamp.getFullYear() }}
        </p>
      </div>
      <div style="clear:both;"></div>
    </div>
    <img v-if="blogPost.postImage" src="blogPost.postImage" />
    <img v-else src="../assets/post-image.jpg" />
    <p v-for="paragraph in blogPost.paragraphs" :key="paragraph.id">
      {{ paragraph.text }}
    </p>
    <h2>Comments</h2>
    <CommentForm
      id="comment-form"
      :loggedIn="loggedIn"
      :currentUser="currentUser"
      :reply="false"
    />
    <div v-if="comments.length">
      <CommentPost
        v-for="comment in comments"
        :key="comment.timestamp.seconds"
        :comment="comment"
        :loggedIn="loggedIn"
        :currentUser="currentUser"
      />
    </div>
    <div v-else>
      <p>No Comments!</p>
    </div>
  </div>
</template>

<script>
import CommentPost from '@/components/CommentPost.vue'
import CommentForm from '@/components/CommentForm.vue'
export default {
  components: {
    CommentPost,
    CommentForm
  },
  props: {
    blogPost: {
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
    },
    comments: {
      type: Array,
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
      ]
    }
  }
}
</script>

<style scoped>
div {
  max-width: 100%;
}
img {
  max-width: 100%;
  height: auto;
}
#author-container {
  margin-bottom: 20px;
  color: rgb(110, 127, 143);
}
#author-name {
  margin: 5px 10px;
}
#timestamp {
  margin-left: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 10pt;
}
#comment-form {
  margin-bottom: 20px;
}
</style>
