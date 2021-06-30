import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import TileImage from 'ol/source/TileImage'
import LayerGroup from 'ol/layer/Group'
import {LayerFactory} from '../../layer-factory'

/**
 * 高德地图 (! webrd0* 和 wprd0* 域名前缀不同, 图层不同)
 * scl=1 代表注记, scl=2 代表底图 (去除标注)，style 设置影像和路网
 *
 * - style=6 : 底图 (影像), scl 无效
 * - style=7 : 底图+标注 (矢量)
 *   - scl=2 => 仅保留底图, 去除标注
 * - style=8 : 省界+路网+标注 (矢量)
 *   - scl=2 => 仅保留底图, 去除标注
 */
class GoogleFactory extends LayerFactory {

  createLayerInternal(layerConfig = {}, options) {

    const {
      // layer: vec/img
      layer = 'vec',
      crossOrigin
    } = layerConfig

    if(layer === 'vec') {
      let googleMapLayer = new TileLayer({
        source: new XYZ({
          url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0',
          // TODO: 跨域问题
          // crossOrigin
        })
      })
      return googleMapLayer
    } else if(layer === 'img') {
      //谷歌影像
      let googleRasterLayer = new TileLayer({
        source: new TileImage({
          url: 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G',
          crossOrigin
        }),
      })
      return googleRasterLayer
    }
  }

  checkLayerConfig() {
  }
}

GoogleFactory.LAYER_TYPE = 'google'

export default GoogleFactory
