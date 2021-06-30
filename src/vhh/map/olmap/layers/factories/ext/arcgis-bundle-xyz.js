import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid'

import {LayerFactory} from '../../layer-factory'
import {ensure} from '../../../utils'

class ArcgisBundleXYZFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {

    let {
      url,
      zOffset = 0,
      minZoom,
      maxZoom,
      projection = 'EPSG:4326',
      tileGrid,

      crossOrigin = null
    } = layerConfig

    let sourceOptions = {
      projection,
      crossOrigin,
      tileUrlFunction: function(tileCoord){
        // console.log('tileUrlFunction ==>', tileCoord)
        let [z, x, y] = tileCoord
        // y = Math.pow(2, z - 1) - y
        // y = Math.pow(2, z - 1) - 1 - y
        z = z - zOffset

        let l = `L${z.toString().padStart(2, 0)}`
        let r = `R${y.toString(16).padStart(8, 0)}`
        let c = `C${x.toString(16).padStart(8, 0)}`

        // console.log('tileUrlFunction ==>', [z, x, y], [l, c, r], `${url}/${l}/${r}/${c}.png`)
        return `${url}/${l}/${r}/${c}.png`
      }
    }

    if(tileGrid) {
      sourceOptions.tileGrid = new TileGrid(tileGrid)
    }

    let layerOptions = {
      source: new XYZ(sourceOptions),
      minZoom,
      maxZoom
    }

    return new TileLayer(layerOptions)
  }
  checkLayerConfig(layerConfig) {
    ensure(layerConfig.url, 'url')
  }
}

ArcgisBundleXYZFactory.LAYER_TYPE = 'arcgis-bundle-xyz'

export default ArcgisBundleXYZFactory
