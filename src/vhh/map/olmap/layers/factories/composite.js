import LayerGroup from 'ol/layer/Group'

import {LayerFactory} from '../layer-factory'

/**
 *  layer group
 */
class CompositeFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {
    return new LayerGroup({
      layers: layerConfig.children
        .map(cfg => LayerFactory.getInstance(cfg.type).createLayer(cfg, options))
    })
  }
  checkLayerConfig(layerConfig) {
  }
}

CompositeFactory.LAYER_TYPE = 'composite'

export default CompositeFactory
