import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {LayerFactory} from '../layer-factory'

/**
 * osm
 */
class OSMFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {
    return new TileLayer({
      source: new OSM()
    })
  }
  checkLayerConfig(layerConfig) {
  }
}

OSMFactory.LAYER_TYPE = 'osm'

export default OSMFactory
