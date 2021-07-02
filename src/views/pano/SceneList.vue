<!--
 * @Date: 2021-07-02 15:50:30
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 17:55:03
 * @FilePath: \vuetemplate\src\views\pano\SceneList.vue
-->
<template>
  <div :class="$style.sceneList"
    class=" w-full h-32 bg-black bg-opacity-50 py-2 space-x-4 flex flex-row justify-center">
    <div class=" bg-white bg-opacity-25 w-32 h-full " v-for="(scene,index) in sceneList" :key="index">
      <img :src="scene.thumburl" alt="" class="object-cover w-full h-full cursor-pointer" @click="changeScene(scene)">
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
  data() {
    return {
      krpano: document.querySelector('#krpanoSWFObject'),
    }
  },
  mounted() {
    console.log(this.sceneList);
  },
  methods: {
    changeScene(scene){
      var rand = Math.floor(Math.random() * 10 + 1);
      this.krpano.call('loadscene(' + scene.name + `,null,MERGE,get(blendmodes[transition${rand}].blend))`);
    }

  },
}
</script>

<style lang="postcss" module>
.sceneList{
}
</style>