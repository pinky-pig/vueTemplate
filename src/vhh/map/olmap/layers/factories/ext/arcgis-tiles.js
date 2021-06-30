import TileLayer from 'ol/layer/Tile'
import TileGrid from 'ol/tilegrid/TileGrid'
import XYZ from 'ol/source/XYZ'

import {LayerFactory} from '../../layer-factory'

/**
 * arcgis-tiles
 */
class ArcgisTilesFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {

    let {
      url,
      projection = 'EPSG:4326',
      origin = [-180, 90],
      extent,
      resolutions,
      tileSize = 256,
    } = layerConfig

    let urlTemplate = `${url}/tile/{z}/{y}/{x}`

    let tileGrid  = new TileGrid({
      origin,
      // extent: [-180,-90,180,90],
      resolutions,
      tileSize
    })

    return new TileLayer({
      source: new XYZ({
        url: urlTemplate,
        projection,
        tileGrid,
        // tileUrlFunction: function(tileCoord) {
        //   let z = tileCoord[0]
        //   let x = tileCoord[1]
        //   let y = -tileCoord[2]
        //   // TODO: ????????
        //   y = y - 1
        //   // return urlTemplate.replace('{z}', (tileCoord[0] - 1).toString())
        //   //   .replace('{x}', tileCoord[1].toString())
        //   //   .replace('{y}', tileCoord[2].toString())
        //   return urlTemplate.replace('{z}', z)
        //     .replace('{x}', x)
        //     .replace('{y}', y)
        // },
        wrapX: true
      })
    })
  }
  checkLayerConfig() {
  }
}

ArcgisTilesFactory.LAYER_TYPE = 'arcgis-tiles'

export default ArcgisTilesFactory
