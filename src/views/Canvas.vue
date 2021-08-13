<!--
 * @Date: 2021-07-05 15:28:38
 * @LastEditors: 王文博
 * @LastEditTime: 2021-07-30 09:34:22
 * @FilePath: \vuetemplate\src\views\Canvas.vue
-->
<template>
  <div  :class="$style.name">
    <canvas id="canvas" class=" bg-gray-400" width="1000" height="400"></canvas>
    <!-- <svg width='140' height='170'>
      <title>Cat</title>
      <desc>Stick Figure of Cat</desc>
      <circle cx='70' cy='95' r='50' style='stroke:black; fill:green'></circle>
    </svg> -->

  </div>
</template>
<script>
export default {
  name: 'vueName',
  layout: "RouterView",
  data () {
    return {

    }
  },
  mounted() {

    const canvas = new fabric.Canvas('canvas');
    const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle:20,
        lockMovementX:false,
        lockMovementY:false,
        evented:true,
        stroke: "rgba(255, 255, 255, 1)",
        strokeWidth: 2
    });
    canvas.add(rect);

  },
  methods:{

  }
}
</script>
<style lang="postcss" module>
.name{

}
</style>