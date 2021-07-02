<!--
 * @Date: 2021-07-01 18:38:13
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 19:11:12
 * @FilePath: \vuetemplate\src\views\Intro.vue
-->
<template>
  <div class="admin">
    <section class="menu">
      <ul>
        <li data-step="1" class="demo1" >测试1</li>
        <li data-step="2" class="demo2" >测试2</li>
        <li data-step="3" class="demo3" >测试3</li>
        <li data-step="4" data-intro="4" >测试4</li>
      </ul>
    </section>
  </div>
</template>

<script>
// 导出组件数据
import introJs from 'intro.js'
import 'intro.js/introjs.css'

// 导出组件数据
export default {
  data() {
    return {
      img:`<img :src="${require('@/assets/cat.webp')}" alt="">`
    }
  },
    // 钩子函数
    mounted() {
      this.guide()
    },
    // 定义方法
    methods: {
        guide() {
            introJs()
            .setOptions({
                nextLabel: '下一个',  // 下一个按钮文字
                prevLabel: '上一个',  // 上一个按钮文字
                skipLabel: '跳过',    // 跳过按钮文字
                doneLabel: '立即体验',// 完成按钮文字
                hidePrev: true,       // 在第一步中是否隐藏上一个按钮
                hideNext: true,       // 在最后一步中是否隐藏下一个按钮
                exitOnOverlayClick: false,  // 点击叠加层时是否退出介绍
                showStepNumbers: false,     // 是否显示红色圆圈的步骤编号
                disableInteraction: true,   // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
                showBullets: false ,         // 是否显示面板指示点
                steps: [{
                  title: 'Welcome',
                  element: document.querySelector('.demo1'),
                  intro: 'Hello World! 👋'
                },{
                  title: 'Welcome',
                  element: document.querySelector('.demo2'),
                  intro: 'Hello World! 👋'
                },{
                  element: document.querySelector('.demo3'),
                  intro: '<img src="https://i.giphy.com/media/ujUdrdpX7Ok5W/giphy.webp" onerror="this.onerror=null;this.src=\'https://i.giphy.com/ujUdrdpX7Ok5W.gif\';" alt="">'
                },
                {
                  intro: 'This step focuses on an element'
                }]
            }).start()
        },
    },
}
</script>

<style  scoped>
</style>
