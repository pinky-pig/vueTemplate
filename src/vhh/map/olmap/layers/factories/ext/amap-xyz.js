import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
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
class AMapXYZFactory extends LayerFactory {

  createLayerInternal(layerConfig = {}, options) {

    const {
      // layer: vec/img
      layer = 'vec',
      crossOrigin
    } = layerConfig

    if(layer === 'vec') {
      let url = 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
      let layer = new TileLayer({
        source: new XYZ({
          url,
          crossOrigin
        })
      })
      return layer
    } else if(layer === 'img') {
      return new LayerGroup({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&style=6',
              crossOrigin
            })
          }),
          new TileLayer({
            source: new XYZ({
              url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&style=8',
              crossOrigin
            })
          })
        ]
      })
    }

  }

  checkLayerConfig() {
  }
}

AMapXYZFactory.LAYER_TYPE = 'amap-xyz'

export default AMapXYZFactory
