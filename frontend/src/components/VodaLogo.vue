<template>
<svg :style="cssProps" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-vodafone-logo" aria-label="vodafone-logo" aria-hidden="true" class="_1Ve6kLJd K8CLXkwP zgpCUn44 mbkqKSUl pCIddt1q">
    <g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="none">
        <path fill="#e60000" d="M1024.033 512.016c0 282.779-229.238 512.016-512.016 512.016S.001 794.794.001 512.016C.001 229.237 229.239 0 512.017 0s512.016 229.238 512.016 512.016z"></path>
        <path fill="#fff" d="M516.023 795.758c-139.802.46-285.286-118.85-285.909-310.474-.394-126.732 67.947-248.833 155.336-321.082C470.835 93.628 587.452 48.341 693.363 47.979c13.629 0 27.882 1.084 36.617 4.039-92.61 19.212-166.304 105.385-165.976 203.151v.16c0 2.865.227 5.676.664 8.418l-.04-.302c154.942 37.734 225.286 131.362 225.713 260.589S688.634 795.165 516.024 795.756z"></path>
    </g>
<title xmlns="http://www.w3.org/2000/svg">vodafone-logo</title></svg>
</template>

<script>
export default {
  props: ["size"],
  computed: {
    cssProps() {
      return {
        '--size': this.size
      }
    }
  }
}
</script>

<style scoped>
svg {
  height: var(--size);
  width: var(--size);
}
</style>