import LayerGroup from 'ol/layer/Group'
import {LayerFactory} from '../layer-factory'

/**
 * tianditu
 * 支持服务类型:
 * - 矢量底图
 *   - 经纬度投影: vec_c
 *   - 球面墨卡托投影: vec_w
 * - 矢量注记
 *   - 经纬度投影: cva_c
 *   - 球面墨卡托投影: cva_w
 * - 影像底图
 *   - 经纬度投影: img_c
 *   - 球面墨卡托投影: img_w
 * - 影像注记
 *   - 经纬度投影: cia_c
 *   - 球面墨卡托投影: cia_w
 * - 地形晕渲
 *   - 经纬度投影: ter_c
 *   - 球面墨卡托投影: ter_w
 * - 地形注记
 *   - 经纬度投影: cta_c
 *   - 球面墨卡托投影: cta_w
 * - 全球境界
 *   - 经纬度投影: ibo_c
 *   - 球面墨卡托投影: ibo_w
 * - 矢量英文注记
 *   - 经纬度投影: eva_c
 *   - 球面墨卡托投影: eva_w
 * - 影像英文注记
 *   - 经纬度投影: eia_c
 *   - 球面墨卡托投影: eia_w
 */
class TiandituFactory extends LayerFactory {

  createLayerInternal(layerConfig = {}, options) {

    const {
      tk = 'de5ad7492e083c32ac321d0e7aa97a11',
      // 可以传入多个, 返回图层组, 默认为 矢量底图(经纬度投影) + 矢量注记(经纬度投影)
      types = ['vec_c', 'cva_c']
    } = layerConfig

    let layers = types.map(type => {
      const url = `http://t{0-7}.tianditu.gov.cn/${type}/wmts?tk=${tk}`
      const splits = type.split('_')
      return LayerFactory.getInstance('ogc-wmts').createLayer({
        url,
        originX: -180,
        originY: 90,
        matrixSet: splits[1],
        layer: splits[0],
        format: 'tiles'
      }, options)
    })

    if(layers.length === 1) {
      return layers[0]
    }

    return new LayerGroup({layers})
  }

  checkLayerConfig() {
  }
}

TiandituFactory.LAYER_TYPE = 'tianditu'

export default TiandituFactory
