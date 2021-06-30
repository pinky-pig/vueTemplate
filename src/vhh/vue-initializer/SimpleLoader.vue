<template>
<!-- `id="app"` is required! -->
<div id="app"
  class="flex justify-center items-center fixed inset-0"
  :style="styles">
  <div :class="$style.spinner" :style="spinnerStyles"></div>
</div>
</template>

<script>
export default {
  name: 'SimpleLoader',
  props: {
    spinnerColor: {
      default: '#fff'
    },
    backgroundColor: {
      default: '#409EFE'
    }
  },
  computed: {
    styles() {
      return {
        ...this.backgroundColor && { backgroundColor: this.backgroundColor },
      }
    },
    spinnerStyles() {
      return {
        ...this.spinnerColor && { backgroundColor: this.spinnerColor },
      }
    }
  },
}
</script>

<style lang="postcss" module>
.spinner {
  width: 40px;
  height: 40px;
  background-color: #333;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
