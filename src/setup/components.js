import Vue from 'vue'
import ComponentsRegisterPlugin from 'vhh/plugins/components-register'
import {Stack, StackItem} from '@/components/vstack'
import Simplebar from 'vhh/components/Simplebar'
// import VueKrpanoPlugin from '@/krpano/VueKrpanoPlugin'

//  组件注册
Vue.use(ComponentsRegisterPlugin, {
  contexts: [
    require.context('@/components/base', true, /\w+\.(vue|js)$/), // base
    require.context('@/components', false, /The\w+\.(vue|js)$/), // The*
    require.context('@/components/layout', false, /\w+\.(vue|js)$/), // /components/layout/*
  ]
})

Vue.component(Stack.name, Stack)
Vue.component(StackItem.name, StackItem)
Vue.component('Simplebar', Simplebar)
// Vue.use(VueKrpanoPlugin)
