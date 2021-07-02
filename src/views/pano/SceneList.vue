<!--
 * @Date: 2021-07-02 15:50:30
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 17:00:04
 * @FilePath: \vuetemplate\src\views\pano\SceneList.vue
-->
<template>
  <div :class="$style.sceneList"
    class=" w-full h-32 bg-black bg-opacity-50 py-2 space-x-4 flex flex-row justify-center">
    <div class=" bg-white bg-opacity-25 w-32 h-full " v-for="(scene,index) in sceneList" :key="index">
      <img :src="scene.thumburl" alt="" class="object-cover w-full h-full">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    sceneList:{
      type:Array,
      default:[{
        thumburl:'@/assets/cat.webp'
      }]
    }
  },
  mounted() {
    console.log(this.sceneList);
  },
  methods: {

  },
}
</script>

<style lang="postcss" module>
.sceneList{
}
</style>