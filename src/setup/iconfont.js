import Vue from 'vue'
import { createFromIconfontCN } from '@/vhh/components/icon/Iconfont'

Vue.component('Icon', createFromIconfontCN({
  url: '//at.alicdn.com/t/font_2553779_iprpj11tiyd.js',
  fontFamily: 'iconfont',
  classPrefix: 'icon-'
}))