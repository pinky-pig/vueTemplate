import Vue from 'vue'
import { createFromIconfontCN } from '@/vhh/components/icon/Iconfont'

Vue.component('Icon', createFromIconfontCN({
  url: '//at.alicdn.com/t/font_2512108_n3qplkttim8.js',
  fontFamily: 'iconfont',
  classPrefix: 'icon-'
}))
