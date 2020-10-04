<template>
  <div class="icon-wrapper">
    <div style="float:left;" v-html="svg"></div>
    <slot style="float:left;"></slot>
    <div style="clear:both;"></div>
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
      default: 15
    },
    height: {
      type: [Number, String],
      default: 15
    },
    selected: Boolean
  },
  computed: {
    svg() {
      if (this.selected) {
        return feather.icons[this.name].toSvg({
          class: 'icon',
          width: this.width,
          height: this.height,
          color: '#eb6121'
        })
      } else {
        return feather.icons[this.name].toSvg({
          class: 'icon',
          width: this.width,
          height: this.height
        })
      }
    }
  }
}
</script>

<style scoped>
div {
  padding-right: 5px;
}
.icon-wrapper:hover {
  transform: scale(1.25);
}
</style>
