<!--
 * @Date: 2021-07-02 14:21:37
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 15:59:54
 * @FilePath: \vuetemplate\src\views\pano\EditorTool.vue
-->
<template>
  <div :class="$style.EditorTools" class=" h-full ">
    <div class=" w-full h-20 ">
      <el-radio-group v-model="value" size="small">
        <el-radio-button label="1">点  </el-radio-button>
        <el-radio-button label="2">线  </el-radio-button>
        <el-radio-button label="3">面  </el-radio-button>
      </el-radio-group>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value:'2'
    }
  },
}
</script>

<style lang="postcss" module>
.EditorTools{
}
</style>