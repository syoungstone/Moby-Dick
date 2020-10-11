<template>
  <div id="image-container" :style="{ width: dimensions, height: dimensions }">
    <img v-if="imgSrc" :src="imgSrc" />
    <img v-else-if="userKey === 999999" src="../assets/melville.jpg" />
    <img v-else src="../assets/0.jpg" />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    dimensions: {
      type: String,
      required: true
    },
    userKey: Number
  }
}
</script>

<style scoped>
#image-container {
  clip-path: circle(50% at 50% 50%);
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
