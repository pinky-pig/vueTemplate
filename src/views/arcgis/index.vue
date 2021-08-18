<template>
  <div :class="$style.map" id="viewDiv">
    <div
      @click="testQuery"
      id="line-button"
      class="esri-widget esri-widget--button esri-interactive"
      title="Draw polyline"
    >
      <span class="esri-icon-polyline"></span>
    </div>

    <div
      class=" p-2 flex flex-row items-center justify-between bg-white opacity-90 rounded-md shadow-lg absolute"
      style="bottom:15px;width:350px;height:45px;right:calc(50% - 175px)"
    >
      <div
        @click="drawPoint"
        :class="$style.toolButton"
        :style="{
          background: selectTool === 0 ? 'rgba(0,0,0,0.8)' : '',
          color: selectTool === 0 ? 'white' : '',
        }"
      >
        <Icon name="zuoshang101" :size="19"></Icon>
      </div>
      <div
        @click="drawPoint"
        :class="$style.toolButton"
        :style="{
          background: selectTool === 1 ? 'rgba(0,0,0,0.8)' : '',
          color: selectTool === 1 ? 'white' : '',
        }"
      >
        <Icon name="LABEL" :size="24"></Icon>
      </div>
      <div
        @click="drawLine"
        :class="$style.toolButton"
        :style="{
          background: selectTool === 2 ? 'rgba(0,0,0,0.8)' : '',
          color: selectTool === 2 ? 'white' : '',
        }"
      >
        <Icon name="GRAPHIC" :size="24"></Icon>
      </div>
      <div
        @click="drawPolygon"
        :class="$style.toolButton"
        :style="{
          background: selectTool === 3 ? 'rgba(0,0,0,0.8)' : '',
          color: selectTool === 3 ? 'white' : '',
        }"
      >
        <Icon name="SELECTION" :size="24"></Icon>
      </div>
      <!-- 橡皮擦 -->
      <div @click="drawClear" class="  bg-red-200" :class="$style.toolButton">
        <Icon name="icon-test" :size="24"></Icon>
      </div>
    </div>
  </div>
</template>
<script>
import { loadScript, loadModules, loadCss } from "esri-loader";
import { layerData } from "./geometryData.js";
import { initPano } from "./mapPano.js";

loadScript({ url: "http://106.12.72.105:8997/arcgis/init.js" });
loadCss("http://106.12.72.105:8997/arcgis/esri/css/main.css");
export default {
  layout: "RouterView",
  data() {
    return {
      map: "",
      mapView: "",
      wkid: 4490,
      bookmarks_list: [],
      sketchLayer: "",
      // -1就是没选中 1、2、3分别代表选中工具
      selectTool: -1,
      drawLayer: undefined,

      featureLayer: undefined,
      featureLayerS: undefined,

      featureLayerData: layerData(),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化地图
    init() {
      loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/layers/TileLayer",
        "esri/layers/WebTileLayer",
        "esri/layers/MapImageLayer",
        "esri/layers/support/TileInfo",
        "esri/geometry/Extent",
        "esri/geometry/SpatialReference",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/widgets/DistanceMeasurement2D",
        "esri/widgets/AreaMeasurement2D",
        "esri/widgets/Bookmarks",
        "esri/core/watchUtils",
        "esri/Graphic",
        "esri/views/draw/Draw",
        "esri/widgets/Sketch",
        "esri/tasks/support/Query",
      ])
        .then(
          ([
            esriConfig,
            Map,
            MapView,
            SceneView,
            TileLayer,
            WebTileLayer,
            MapImageLayer,
            TileInfo,
            Extent,
            SpatialReference,
            GraphicsLayer,
            FeatureLayer,
            Point,
            DistanceMeasurement2D,
            AreaMeasurement2D,
            Bookmarks,
            watchUtils,
            Graphic,
            Draw,
            Sketch,
            Query,
          ]) => {
            this.map = new Map({});
            this.map.Draw = Draw;
            this.map.FeatureLayer = new FeatureLayer();

            // 定义地图范围
            const initialExtent = new Extent({
              xmin: 116.10358013377254,
              ymin: 30.710719079012677,
              xmax: 122.09030402444137,
              ymax: 35.21265930204362,
              spatialReference: {
                wkid: this.wkid,
              },
            });
            // 118.32952090939195, 32.290290778854995

            this.mapView = new MapView({
              // 地图挂载的dom元素
              container: "viewDiv",
              map: this.map,
              // 坐标系
              spatialReference: {
                wkid: this.wkid,
              },
              // 地图初始化范围。如果初始化范围和地图中心点坐标不一致，会优先范围extent
              // extent: initialExtent,
              // 地图初始化中心店
              center: new Point(118.32952090939195, 32.290290778854995, {
                wkid: this.wkid,
              }),
              // 地图初始化放大层级
              zoom: 18,
              // 地图允许放大缩小的最大最小层级
              constraints: {
                minZoom: 3,
                maxZoom: 18,
              },
              // 点的弹出框
              popup: {
                dockEnabled: false,
                dockOptions: {
                  buttonEnabled: false,
                  breakpoint: false,
                },
              },
              ui: { components: ["zoom"] },
            });

            //定义瓦片结构
            const tileInfo = new TileInfo({
              dpi: 96,
              rows: 256,
              cols: 256,
              compressionQuality: 0,
              format: "png",
              size: 256,
              origin: new Point({ x: -180, y: 90 }),
              spatialReference: {
                wkid: this.wkid,
              },
              lods: [
                {
                  level: 0,
                  resolution: 1.406250026231578,
                  scale: 5.90995197141668e8,
                },
                {
                  level: 1,
                  resolution: 0.703125013115789,
                  scale: 2.95497598570834e8,
                },
                {
                  level: 2,
                  resolution: 0.3515625065578945,
                  scale: 1.47748799285417e8,
                },
                {
                  level: 3,
                  resolution: 0.17578125327894775,
                  scale: 7.38743996427087e7,
                },
                {
                  level: 4,
                  resolution: 0.08789062663947399,
                  scale: 3.69371998213544e7,
                },
                {
                  level: 5,
                  resolution: 0.043945313319736994,
                  scale: 1.84685999106772e7,
                },
                {
                  level: 6,
                  resolution: 0.021972656659868472,
                  scale: 9234299.95533859,
                },
                {
                  level: 7,
                  resolution: 0.010986328329934226,
                  scale: 4617149.97766929,
                },
                {
                  level: 8,
                  resolution: 0.005493164164967124,
                  scale: 2308574.98883465,
                },
                {
                  level: 9,
                  resolution: 0.0027465820824835504,
                  scale: 1154287.49441732,
                },
                {
                  level: 10,
                  resolution: 0.0013732910412417797,
                  scale: 577143.747208662,
                },
                {
                  level: 11,
                  resolution: 6.866455206208899e-4,
                  scale: 288571.873604331,
                },
                {
                  level: 12,
                  resolution: 3.433227603104438e-4,
                  scale: 144285.936802165,
                },
                {
                  level: 13,
                  resolution: 1.716613801552224e-4,
                  scale: 72142.9684010827,
                },
                {
                  level: 14,
                  resolution: 8.583069007761132e-5,
                  scale: 36071.4842005414,
                },
                {
                  level: 15,
                  resolution: 4.291534503880566e-5,
                  scale: 18035.7421002707,
                },
                {
                  level: 16,
                  resolution: 2.1457672519402802e-5,
                  scale: 9017.87105013534,
                },
                {
                  level: 17,
                  resolution: 1.0728836259701401e-5,
                  scale: 4508.93552506767,
                },
                {
                  level: 18,
                  resolution: 5.364418129850712e-6,
                  scale: 2254.46776253384,
                },
              ],
            });

            this.vectorLayer = new WebTileLayer({
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=dd32148a58cdbe73ea4dec079b2cc10a",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tileInfo: tileInfo,
              spatialReference: { wkid: this.wkid },
            });
            this.vectorAnnoLayer = new WebTileLayer({
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=dd32148a58cdbe73ea4dec079b2cc10a",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tileInfo: tileInfo,
              spatialReference: { wkid: this.wkid },
              opacity: "0.7",
            });

            this.map.add(this.vectorLayer, 0);
            this.map.add(this.vectorAnnoLayer, 1);

            this.mapView.ui.remove("zoom"); //清除放大缩小按钮

            this.mapView.ui.remove("attribution"); //清楚底部powered by ESRI

            // 向地图添加书签
            const bookmarks = new Bookmarks({
              view: this.mapView,
              bookmarks: this.bookmarks_list,
              editingEnabled: true,
              bookmarkCreationOptions: {
                takeScreenshot: true,
                captureViewpoint: false,
                screenshotSettings: {
                  width: 100,
                  height: 100
                }
              }
            });
            this.mapView.ui.add(bookmarks, "top-right");

            // 添加素描绘制工具条
            this.sketchLayer = new GraphicsLayer();
            this.map.add(this.sketchLayer, 1);
            this.sketch = new Sketch({
              layer: this.sketchLayer,
              view: this.mapView,
              creationMode: "single",
              availableCreateTools: [
                "point",
                "polyline",
                "polygon",
                "rectangle",
                "circle",
              ],
            });
            // this.mapView.ui.add(this.sketch, "top-right");

            this.mapView.ui.add("line-button", "top-left");

            let _this = this;
            this.mapView.on("click", (value) => {
              console.log("click", value);
              // let center = new Point(118.32952090939195, 32.290290778854995, { wkid: this.wkid })
              // _this.mapView.goTo({ center: center });
            });

            this.mapView.on("double-click", (value) => {
              // console.log(value);
            });
            // 监听地图的放大缩小层级
            this.mapView.watch("scale", function(value) {
              // console.log('scale',value);
              // console.log('map的zoom级别',_this.mapView.zoom);
            });

            // 绘制图层
            this.drawLayer = new GraphicsLayer({
              id: "drawGraphicLayer",
              elevationInfo: {
                mode: "on-the-ground",
              },
            });

            this.mapView.map.add(this.drawLayer);

            this.initFeatureLayer();



            this.mapView.popup.watch("selectedFeature", function(graphic) {
            if (graphic) {
              debugger
                // initPano('pano','/krpano/tour.xml')
                function loadScript (src) {
                  return new Promise(function (resolve, reject) {
                    let shouldAppend = false
                    let el = document.querySelector('script[src="' + src + '"]')
                    if (!el) {
                      el = document.createElement('script')
                      el.type = 'text/javascript'
                      el.async = true
                      el.src = src
                      shouldAppend = true
                    }
                    else if (el.hasAttribute('data-loaded')) {
                      resolve(el)
                      return
                    }
                    el.addEventListener('error', reject)
                    el.addEventListener('abort', reject)
                    el.addEventListener('load', function loadScriptHandler() {
                      el.setAttribute('data-loaded', true)
                      resolve(el)
                    })
                    if (shouldAppend) document.head.appendChild(el)
                  })
                }
                const krpanoScriptUrl = '/krpano/krpano.js'

                loadScript(krpanoScriptUrl).then(() => window.embedpano)
                var el = document.createElement('script')
                el.type = 'text/javascript'
                el.async = true
                el.text = `embedpano({swf:"/krpano/tour.swf", xml:"/krpano/tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});`
                // let panoDom = document.getElementById(`pano`)
                // panoDom.appendChild(el)
debugger

                function getMapContainer(){
                  let mapContainer = document.getElementsByClassName("pano")
                  if (mapContainer.length === 0 ) {
                    return setTimeout(()=>{
                      getMapContainer()
                    },500)
                  }else{
                    console.log(window.embedpano);
                    let panoDom = mapContainer[0]
                    panoDom.id = 'pano'
                    panoDom.appendChild(el)
                  }
                }
                getMapContainer()




            }
          });



          }
        )
        .catch((err) => {
          console.error(err);
        });
    },

    // 地图空间查询
    geometryQuery() {
      let query = _this.featureLayerS.createQuery();
      query.geometry = value.mapPoint;
      query.outFields = ["*"];
      _this.featureLayerS.queryFeatures(query).then(function(res) {
        console.log(res, "response");
        if (res.features.length === 0) {
          // 未查询到
          // _this.$message.warning("未查询到数据")
          return false;
        }

        let polygongeo = res.features[0].geometry;

        const polygonSymbol = {
          type: "simple-fill",
          color: [0, 0, 0, 0.2],
          outline: {
            color: [250, 250, 250],
            width: 2,
          },
        };

        let polygonGra = new Graphic({
          geometry: polygongeo,
          symbol: polygonSymbol,
        });

        console.log(polygonGra, "polygonGra");

        // 绘制图层
        let showLayer = new GraphicsLayer({
          id: "showGraphicLayer",
          elevationInfo: {
            mode: "on-the-ground",
          },
        });

        _this.mapView.map.add(showLayer);

        showLayer.add(polygonGra);
      });
    },

    initFeatureLayer() {
      let _this = this;

      loadModules([
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/geometry/Polygon",
        "esri/geometry/Polyline",
      ]).then(
        ([
          GraphicsLayer,
          SketchViewModel,
          FeatureLayer,
          Graphic,
          Polygon,
          Polyline,
        ]) => {
          // 样式
          const symbol = {
            type: "simple-fill",
            color: [0, 0, 0, 0.2],
            outline: {
              color: [250, 250, 250],
              width: 2,
            },
          };
          // graphic数组
          let graphicArr = [];
          _this.featureLayerData.forEach((items) => {
            // json数据生成多边形
            let polygon = new Polygon({
              rings: items.geometry.rings,
              spatialReference: items.geometry.spatialReference,
              symbol: items.symbol,
            });
            // 多边形构造graphic
            let graphic = new Graphic({
              geometry: polygon,
              symbol: symbol,
            });

            graphicArr.push(graphic);
          });
          // 构造featureLayerS层
          _this.featureLayerS = new FeatureLayer({
            source: graphicArr, // array of graphics objects
            objectIdField: "OBJECTID",
            fields: [
              {
                name: "OBJECTID",
                type: "oid",
              },
              {
                name: "url",
                type: "string",
              },
            ],
            popupTemplate: {
              content: `<div id="pano" class="pano" style="height:250px;width:100%"></div>`,
            },
            // renderer: {  // overrides the layer's default renderer
            //   type: "simple",
            //   symbol: {
            //     type: "text",
            //     // color: "#7A003C",
            //     text: "\ue661",
            //     font: {
            //       size: 20,
            //       family: "CalciteWebCoreIcons"
            //     }
            //   }
            // }
          });
          // this.featureLayerS.visible = false

          _this.map.add(_this.featureLayerS);
        }
      );
    },

    jump() {
      view.goTo(
        {
          // 看向一个可视区域 主要参数是geometry 或者 extent
          target: polygon.extent,
          // 将摄像头移动到一个点上面
          center: point || [lon, lat],
          // 同上 用上面的center就行了
          position: point,
          // 这个是控制摄像头的水平方向
          heading: 0,
          // 这个是控制摄像头的垂直朝向
          tilt: 90,
          // 地图层级高度 一般最大是20  最小0   20的时候就已经贴着地面了几乎
          zoom: 18,
          // 焦距这个一般都不设置 直接使用target就好了， 一定要理解的话 这个就相当于焦距 也就是说 摄像头的位置设置焦距
          fov: 0,
        },
        {
          // 指是否需要过度动画， 一般都会是true 默认也是true
          animate: true,
          // 动画速度系数 1就是正常速度  0.5就是一半速度 2就是一倍速度
          speedFactor: 1,
          // 持续速度  持续5秒达到  这个配置会覆盖上面的动画系数
          duration: 5000,
          // 允许的最大持续时间， 有时候镜头移动距离太远了 如果设置的恒定速度 就会导致时间过长， 这个配置可以解决这个问题
          maxDuration: 5000,
          // 移动的模式  均速移动 还有很多配置 详情见api
          easing: "linear",
        }
      );
    },

    // 测试地图查询
    testQuery() {},

    // 绘制点
    drawPoint() {
      let _this = this;
      loadModules([
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch/SketchViewModel",
      ]).then(([GraphicsLayer, SketchViewModel]) => {
        // const drawPointLayer = new GraphicsLayer({
        //   id: 'pointGraphicLayer',
        //   elevationInfo: {
        //     mode: 'on-the-ground',
        //   },
        // });

        // this.mapView.map.add(drawPointLayer);

        // 2、设置点要素的符号
        const pointSymbol = {
          type: "simple-marker",
          style: "diamond",
          color: "#d81e06",
          size: "32px",
          outline: {
            color: [255, 255, 255],
            width: 3,
          },
        };

        // 1、实例化SketchViewModel实例
        var sketchViewModel = new SketchViewModel({
          updateOnGraphicClick: false,
          view: this.mapView,
          layer: this.drawLayer,
          pointSymbol,
        });

        // 3、激活点要素绘制工具
        // Possible Values:"point"|"multipoint"|"polyline"|"polygon"|"circle"|"rectangle"|"move"|"transform"|"reshape"
        sketchViewModel.create("point");

        this.selectTool = 1;

        // 4、绘制，并且监听绘制结束的事件
        sketchViewModel.on("create", function(event) {
          if (event.state === "complete") {
            _this.selectTool = -1;
          }
        });
      });
    },
    // 绘制线条
    drawLine() {
      let _this = this;

      loadModules([
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch/SketchViewModel",
      ]).then(([GraphicsLayer, SketchViewModel]) => {
        // 2、设置点要素的符号
        const polylineSymbol = {
          type: "simple-line",
          color: [130, 130, 130],
          width: 2,
        };

        // 1、实例化SketchViewModel实例
        var sketchViewModel = new SketchViewModel({
          updateOnGraphicClick: false,
          view: this.mapView,
          layer: this.drawLayer,
          polylineSymbol,
        });

        // 3、激活点要素绘制工具
        sketchViewModel.create("polyline");

        // 工具条背景色变色
        this.selectTool = 2;

        // 4、绘制，并且监听绘制结束的事件
        sketchViewModel.on("create", function(event) {
          if (event.state === "complete") {
            _this.selectTool = -1;
          }
        });
      });
    },

    // 绘制多边形
    drawPolygon() {
      let _this = this;

      loadModules([
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/geometry/Polygon",
      ]).then(
        ([GraphicsLayer, SketchViewModel, FeatureLayer, Graphic, Polygon]) => {
          // 2、设置要素的符号
          const polygonSymbol = {
            type: "simple-fill",
            color: [150, 150, 150, 0.2],
            outline: {
              color: [50, 50, 50],
              width: 2,
            },
          };

          // 1、实例化SketchViewModel实例
          var sketchViewModel = new SketchViewModel({
            updateOnGraphicClick: false,
            view: this.mapView,
            layer: this.drawLayer,
            polygonSymbol,
          });

          // 3、激活点要素绘制工具
          sketchViewModel.create("polygon");

          // 工具条背景色变色
          this.selectTool = 3;

          // 4、绘制，并且监听绘制结束的事件
          sketchViewModel.on("create", function(event) {
            if (event.state === "complete") {
              _this.selectTool = -1;
            }
          });
        }
      );
    },

    drawClear() {
      // this.drawLayer.removeAll()
      this.drawLayer.visible = false;
      this.featureLayer.visible = false;
    },
  },
};
</script>
<style>
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.esri-view-height-less-than-medium .esri-popup__main-container{
  max-height:400px
}
</style>
<style lang="postcss" module>
.map {
  .toolButton {
    @apply rounded-md cursor-pointer text-black hover:bg-gray-200 flex flex-row items-center justify-center;
    width: 30px;
    height: 30px;
  }
}
</style>
