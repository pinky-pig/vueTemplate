import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import {getWidth, getTopLeft} from 'ol/extent'
import {get as getProjection} from 'ol/proj'

import {LayerFactory} from '../layer-factory'
import {ensure} from '../../utils'

/**
 * ogc-wmts (!!!与 custom-wmts 相同)
 */
class OGCWMTSFactory extends LayerFactory {

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
      style = 'default'
    } = layerConfig

    let projectionExtent = getProjection(projection).getExtent()
    let size = getWidth(projectionExtent) / tileSize

    if(!resolutions) {
      resolutions = new Array(19)
      matrixIds = new Array(19)
      for (let z = 0; z < 19; z++) {
        resolutions[z] = size / Math.pow(2, z)
        matrixIds[z] = z
      }
    }

    if(!matrixIds) {
      matrixIds = []
      for (let i = 0; i < resolutions.length; i++) {
        matrixIds[i] = i
      }
    }

    if(!origin) {
      origin = getTopLeft(projectionExtent)
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

OGCWMTSFactory.LAYER_TYPE = 'ogc-wmts'

export default OGCWMTSFactory
