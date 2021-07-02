<!--
 * @Date: 2021-07-01 17:16:01
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 15:59:10
 * @FilePath: \vuetemplate\src\views\pano\Pano.vue
-->
<template>
  <div class="m-auto" :class="$style.pano">
    <div style="height:100vh;width:100vw" class=" text-center" :class="$style.main">
      <Vtour class=" relative">
        <!-- 右侧编辑栏 -->
        <div class=" absolute top-4 right-64 z-10" style="height:90%">
          <div @click="editFlag = !editFlag" v-if="editFlag" class=" cursor-pointer bg-white bg-opacity-30 w-10 h-10 rounded-full flex justify-center items-center">
            <v-icon name="edit" scale="1.4" class=" text-white" ></v-icon>
          </div>
          <EditorPane v-else :editFlag="editFlag" @editFlag="editFlag=true"></EditorPane>
        </div>

        <!-- 下方场景列表 -->
        <div @click="sceneFlag = !sceneFlag" class=" absolute bottom-4 left-4 z-10 cursor-pointer bg-white bg-opacity-30 w-10 h-10 rounded-full flex justify-center items-center">
          <v-icon name="bars" scale="1.4" class=" text-white" ></v-icon>
        </div>
        <SceneList v-if="!sceneFlag" class=" bottom-14 left-8 z-10" style="position:absolute"></SceneList>
      </Vtour>
    </div>
  </div>
</template>

<script>
import Vtour from '@/components/krpano/Vtour'
import EditorPane from './EditorPane.vue'
import SceneList from './SceneList.vue'
export default {
  components:{
    Vtour,
    EditorPane,
    SceneList
  },
  data() {
    return {
      editFlag:true,
      sceneFlag:true
    }
  },
}
</script>

<style lang="postcss" module>
.pano{
  .main{
  }
}
</style>