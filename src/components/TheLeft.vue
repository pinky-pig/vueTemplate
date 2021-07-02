<!--
 * @Date: 2021-07-01 13:53:51
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 18:39:13
 * @FilePath: \vuetemplate\src\components\TheLeft.vue
-->
<template>
  <div :class="$style.theLeft" class="h-full relative">
    <div class=" bg-primary absolute bottom-0 z-10" style="width:220px;">
      <img src="@/assets/cat.webp" alt="">
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#4e466b"
      active-text-color="#fff"
      :collapse-transition='true'
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Menu</span>
        </template>
        <el-menu-item-group>
          <span slot="title" >HH</span>
          <el-menu-item index="1-1" @click="goTo('1-1')"> Home </el-menu-item>
          <el-menu-item index="1-2" @click="goTo('1-2')"> Pano  </el-menu-item>
          <el-menu-item index="1-2" @click="goTo('1-3')"> Editor  </el-menu-item>
          <el-menu-item index="1-2" @click="goTo('1-4')"> Intro  </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(data){
      switch (data) {
        case '1-1':
          this.$router.push('/')
          break;
        case '1-2':
          this.$router.push('/pano')
          break;
        case '1-3':
          this.$router.push('/editor')
          break;
        case '1-4':
          this.$router.push('/intro')
          break;

        default:
          break;
      }
    }
  },
};
</script>
<style>

</style>
<style lang="postcss" module>
.theLeft {
  :global{
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 220px;
      min-height: 400px;
      height:100%;
    }
  }
}
</style>
