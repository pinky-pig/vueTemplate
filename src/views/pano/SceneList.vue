<!--
 * @Date: 2021-07-02 15:50:30
 * @LastEditors: wangwenbo
<<<<<<< HEAD
 * @LastEditTime: 2021-07-03 14:02:50
 * @FilePath: \vueTemplate\src\views\pano\SceneList.vue
=======
 * @LastEditTime: 2021-07-02 17:55:03
 * @FilePath: \vuetemplate\src\views\pano\SceneList.vue
>>>>>>> 3d50f26081d3d05fb2b9e306768561f5a1d6125c
-->
<template>
  <div :class="$style.sceneList"
    class=" w-full h-32 bg-black bg-opacity-50 py-2 space-x-4 flex flex-row justify-center">
<<<<<<< HEAD
    <div class=" cursor-pointer bg-white bg-opacity-25 w-32 h-full " v-for="(scene,index) in sceneList" :key="index">
      <img :src="scene.thumburl" alt="" class="object-cover w-full h-full" @click="switchScene(scene)">
=======
    <div class=" bg-white bg-opacity-25 w-32 h-full " v-for="(scene,index) in sceneList" :key="index">
      <img :src="scene.thumburl" alt="" class="object-cover w-full h-full cursor-pointer" @click="changeScene(scene)">
>>>>>>> 3d50f26081d3d05fb2b9e306768561f5a1d6125c
    </div>
  </div>
</template>

<script>
// 自定义随即范围内随机数
function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}
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
  },
  methods: {
<<<<<<< HEAD
    switchScene(scene){
      let num = rd(0,11)
      this.krpano.call(`loadscene(${scene.name}, null, MERGE, get(blendmodes[transition${num}].blend))`)
    }
=======
    changeScene(scene){
      var rand = Math.floor(Math.random() * 10 + 1);
      this.krpano.call('loadscene(' + scene.name + `,null,MERGE,get(blendmodes[transition${rand}].blend))`);
    }

>>>>>>> 3d50f26081d3d05fb2b9e306768561f5a1d6125c
  },
}
</script>

<style lang="postcss" module>
.sceneList{
}
</style>