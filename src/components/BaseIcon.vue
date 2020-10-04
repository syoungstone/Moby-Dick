<template>
  <div class="icon-wrapper">
    <div class="icon-wrapper" v-html="svg"></div>
  </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  name: 'Icon',
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width,
        height: this.height
      })
    }
  }
}
</script>
