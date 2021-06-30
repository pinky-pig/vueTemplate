import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

import {LayerFactory} from '../layer-factory'
import {ensure} from '../../utils'

/**
 * 自定义 WMTS
 */
class CustomWMTSFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {

    let {
      url,
      layer,
      matrixSet,
      format = 'image/png',
      projection = 'EPSG:4326',
      origin = [-180, 90],
      tileSize = 256,
      resolutions,
      matrixIds,
      style = 'default',

      ...rest
    } = layerConfig


    // !!! 调整自定义 WMTS 的一个数据错误, image/tile => image/png
    if(format === 'image/tile') {
      format = 'image/png'
    }
    if(!matrixIds) {
      matrixIds = resolutions.map((item, idx) => idx)
    }

    return new TileLayer({
      source: new WMTS({
        url,
        layer,
        matrixSet,
        format,
        projection,
        tileGrid: new WMTSTileGrid({
          origin,
          tileSize,
          resolutions,
          matrixIds
        }),
        style,
        wrapX: true
      })
    })
  }
  checkLayerConfig(layerConfig) {
    ensure(layerConfig.url, 'url')
  }
}

CustomWMTSFactory.LAYER_TYPE = 'custom-wmts'
// CustomWMTSFactory.LAYER_TYPE_NAME = '自定义 WMTS'

export default CustomWMTSFactory
