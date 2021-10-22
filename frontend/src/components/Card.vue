<template>
<div class="cardwrapper" :style="cssProps"><div class="cardroot"><slot /></div></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    }
  },
  computed: {
    cssProps() {
      return {
        '--width': this.width
      }
    }
  }
}
</script>

<style scoped>
.cardwrapper {
  width: var(--width);
}
.cardroot {
  background: var(--brand-white);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin: 8px;
  position: relative;
}
</style>