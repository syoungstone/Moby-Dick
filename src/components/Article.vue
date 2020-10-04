<template>
  <div id="article-container">
    <h1>{{ article.title }}</h1>
    <h3>{{ article.subheader }}</h3>
    <p v-for="paragraph in article.paragraphs" :key="paragraph.id">
      {{ paragraph.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    article: Object
  }
}
</script>

<style>
#article-container {
  max-width: 40em;
}
</style>
