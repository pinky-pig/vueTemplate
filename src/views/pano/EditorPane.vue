<!--
 * @Date: 2021-07-02 14:11:02
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 15:14:47
 * @FilePath: \vuetemplate\src\views\pano\EditorPane.vue
-->
<template>
  <div class=" w-60 h-4/5 bg-black bg-opacity-30 p-6 relative">

  <div @click="$emit('editFlag')" class=" cursor-pointer absolute left-0 top-0 hover:bg-white hover:bg-opacity-30 w-10 h-10  flex justify-center items-center">
    <v-icon name="angle-double-right" scale="1.4" class=" text-white" ></v-icon>
  </div>
    <EditorTool></EditorTool>
  </div>
</template>

<script>
import EditorTool from './EditorTool.vue'
export default {
  props:['editFlag'],
  components:{
    EditorTool
  }
}
</script>

<style>

</style>