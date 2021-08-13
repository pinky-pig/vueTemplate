<!--
 * @Date: 2021-07-01 17:16:01
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-08 17:18:09
 * @FilePath: \vuetemplate\src\views\pano\Pano.vue
-->
<template>
  <div class="m-auto" :class="$style.pano">
    <div style="height:100vh;width:100%" class=" text-center" :class="$style.main">
      <Vtour class=" relative ">
        <!-- 右侧编辑栏 -->
        <div class=" absolute top-4 right-4 z-10" style="height:90%">
          <div @click="editFlag = !editFlag" v-if="editFlag" class=" cursor-pointer bg-white bg-opacity-30 w-10 h-10 rounded-full flex justify-center items-center">
            <v-icon name="edit" scale="1.4" class=" text-white" ></v-icon>
          </div>
          <EditorPane v-else :editFlag="editFlag" @editFlag="editFlag=true"></EditorPane>
          <div @click="draw" class=" cursor-pointer mt-4 bg-white bg-opacity-30 w-10 h-10 text-white rounded-full flex justify-center items-center">
            <v-icon name="pen" scale="1.4" class=" text-white"></v-icon>
          </div>
        </div>


        <!-- 下方场景列表 -->
        <div @click="sceneFlag = !sceneFlag" class=" absolute bottom-4 left-4 z-10 cursor-pointer bg-white bg-opacity-30 w-10 h-10 rounded-full flex justify-center items-center">
          <v-icon name="bars" scale="1.4" class=" text-white" ></v-icon>
        </div>
        <SceneList v-if="!sceneFlag" :sceneList='sceneList' class=" bottom-20 z-10" style="position:absolute"></SceneList>

        <div class=" absolute bottom-4 left-20 z-10 cursor-pointer bg-white bg-opacity-30 w-10 h-10 rounded-full flex justify-center items-center">
          <v-icon name="map-marked-alt" scale="1.4" class=" text-white" ></v-icon>
        </div>
        <div class=" text-white absolute bottom-4 left-40 z-10 cursor-pointer bg-white bg-opacity-30 w-96 h-10 rounded-full flex justify-center items-center">
          <span>{{location}}</span>
        </div>

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
      location:'',
      track_mouse_enabled:false,
      track_mouse_interval_id:null,
      editFlag:true,
      sceneFlag:true,

      krpano: document.querySelector('#krpanoSWFObject'),
      sceneList:[],
      scene:{},

      currentHotspot: {
        style: 'defaultskin_button',
        linkedscene: null,
        dive:true
      },
    }
  },
  watch:{
  },

  mounted() {
    setTimeout(()=>{
      this.onready()
    },1000)
  },
  methods: {
    onready(){
      this.krpano = document.querySelector('#krpanoSWFObject')
      this.sceneList = this.krpano.get('scene').getArray()

let loc
        let loc1
      // 监听鼠标单击时间
      document.getElementById('krpanoSWFObject').addEventListener('click',()=>{

        // 计算中间位置的球面坐标
        // this.krpano.call('addhotspot(spot1);')
        // this.krpano.set('hotspot[spot1].ath', this.location.ath)
        // this.krpano.set('hotspot[spot1].visible', 'true')
        // this.krpano.set('hotspot[spot1].atv', this.location.atv)
        // this.krpano.get('hotspot[spot1]').loadstyle(this.currentHotspot.style)


        // <hotspot x-id="xid-layer-004" x-type="02" x-layer-group="a" visible="false" fillcolor="0xaaaaaa" fillalpha="0.5" borderwidth="6" bordercolor="0xFFF0000"
        // borderalpha="1.0" depth="1000" polyline="false" scaleflying="true" tx="0" ty="0" tz="0">
        //   <point ath="50.5" atv="4.193" />
        //   <point ath="59.584" atv="-0.686" />
        // </hotspot>


        if (!loc) {
          loc =  this.location
        } else {
          this.drawLine(loc, this.location)
          loc1=  this.location
        }

        // this.krpano.get('hotspot[spot1]').loadstyle(this.currentHotspot.style)


      })
    },
    drawLine(point,point1){
      this.krpano.call('addhotspot(spot1);')
      this.krpano.set('hotspot[spot1].x-id', 'xid-layer-004')
      this.krpano.set('hotspot[spot1].visible', 'true')
      this.krpano.set('hotspot[spot1].x-type','02')
      this.krpano.set('hotspot[spot1].x-layer-group','a')
      this.krpano.set('hotspot[spot1].fillcolor','0xaaaaaa')
      this.krpano.set('hotspot[spot1].fillalpha','0.5')
      this.krpano.set('hotspot[spot1].borderwidth','6')
      this.krpano.set('hotspot[spot1].bordercolor','0xFFF0000')
      this.krpano.set('hotspot[spot1].depth','1000')
      this.krpano.set('hotspot[spot1].polyline','false')
      this.krpano.set('hotspot[spot1].scaleflying','true')
      this.krpano.set('hotspot[spot1].point[0].ath',point.ath)
      this.krpano.set('hotspot[spot1].point[0].atv',point.atv)
      this.krpano.set('hotspot[spot1].point[1].ath',point1.ath)
      this.krpano.set('hotspot[spot1].point[1].atv',point1.atv)

    },
    draw(){
      // this.track_mouse()
    },

    // 监听鼠标在全景图中的位置
    track_mouse() {
      if (this.krpano) {
        if (this.track_mouse_enabled == false) {
          // enable - call 60 times per second
          this.track_mouse_interval_id = setInterval(this.track_mouse_interval_callback, 1000.0 / 60.0);
          this.track_mouse_enabled = true;
        } else {
          // disable
          clearInterval(this.track_mouse_interval_id);
          this.track_mouse_enabled = false;
        }
      }
    },
    track_mouse_interval_callback() {
      var mx = this.krpano.get("mouse.x");
      var my = this.krpano.get("mouse.y");
      var pnt = this.krpano.screentosphere(mx,my);
      var h = pnt.x;
      var v = pnt.y;
      this.location = {
        x:mx,
        y:my,
        ath:h.toFixed(2),
        atv:v.toFixed(2)
      }
      // this.location = 'x="' + mx + '" y="' + my + '" ath="' + h.toFixed(2) + '" atv="' + v.toFixed(2) + '"'
    },




  },
}
</script>

<style lang="postcss" module>
.pano{
  .main{
  }
}
</style>