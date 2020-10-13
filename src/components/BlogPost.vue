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
    <img v-if="blogPost.postImage" :src="blogPost.postImage" />
    <img v-else src="../assets/post-image.jpg" />
    <p v-for="paragraph in blogPost.paragraphs" :key="paragraph.id">
      {{ paragraph.text }}
    </p>
    <h2>Comments</h2>
    <CommentForm id="comment-form" :reply="false" parentId="noparent" />
    <div v-if="topLevelComments">
      <div v-if="viewAll">
        <CommentPost
          v-for="comment in topLevelComments"
          :key="comment.timestamp.seconds"
          :comment="comment"
          :parentDeleted="false"
        />
        <h4 class="link" @click="setViewAll">Show less</h4>
      </div>
      <div v-else>
        <CommentPost
          v-for="comment in topLevelComments.slice(0, 3)"
          :key="comment.timestamp.seconds"
          :comment="comment"
          :parentDeleted="false"
        />
        <h4 class="link" v-if="topLevelComments.length > 3" @click="setViewAll">
          Show more
        </h4>
      </div>
    </div>
    <div v-else>
      <p>No Comments!</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      viewAll: false
    }
  },
  computed: {
    ...mapState(['comments']),
    topLevelComments() {
      let topLevelComments = []
      if (this.comments) {
        for (const comment of this.comments) {
          if (!comment.reply) topLevelComments.push(comment)
        }
      }
      return topLevelComments
    }
  },
  methods: {
    setViewAll() {
      this.viewAll = !this.viewAll
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
.link {
  cursor: pointer;
  text-align: center;
}
</style>
