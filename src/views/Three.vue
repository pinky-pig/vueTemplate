<!--
 * @Date: 2021-07-05 09:26:10
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-05 15:10:51
 * @FilePath: \vuetemplate\src\views\Three.vue
-->
<template>
  <div :class="$style.container" id="container">

  </div>
</template>
<script>
import * as Three from "three";
export default {
  layout: "RouterView",
  name: "vue-three",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    };
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
        let container = document.getElementById('container')
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
        this.camera.position.z = 0.6
        this.scene = new Three.Scene()
        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
        let material = new Three.MeshNormalMaterial()
        this.mesh = new Three.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)
      },
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  },
};
</script>

<style lang="postcss" module>
.container {
  width: 800px;
  margin: 0 auto;
  height: 600px;
  overflow: hidden;
}
</style>

