import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

import {LayerFactory} from '../layer-factory'

/**
 * XXX4
 */
class XXX4Factory extends LayerFactory {

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
  checkLayerConfig() {
  }
}

XXX4Factory.LAYER_TYPE = 'XXX4'

export default XXX4Factory
