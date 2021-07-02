<!--
 * @Date: 2021-07-01 18:03:45
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 18:58:51
 * @FilePath: \vuetemplate\src\views\Editor.vue
-->
<template>
  <div class=" w-4/5 m-auto" :class="$style.editor">
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup () {
    const text = ref('');
    return {
      text
    }
  },
  data() {
    return {
      text:''
    }
  },
}
</script>

<style lang='postcss' module>
  .editor{
    margin-top: 100px;
  }
</style>