import {ensure} from '../utils'

class LayerFactory {
  constructor() {
  }

  createLayer(layerConfig = {}, options = {}) {
    // ensure(layerConfig.id, 'id')
    // ensure(layerConfig.name, 'name')
    // ensure(layerConfig.visible, 'visible')

    // 数据处理/适配
    if(options.adaptor) {
      if(Array.isArray(options.adaptor)) {
        layerConfig = options.adaptor.reduce((acc, cur) => cur(acc, this), layerConfig)
      } else {
        layerConfig = options.adaptor(layerConfig, this)
      }
    }

    if(options.debug) {
      console.log('adapted layer config => ', layerConfig, this)
    }

    this.checkLayerConfig(layerConfig)
    let layer = this.createLayerInternal(layerConfig, options)

    if(options.debug) {
      console.log('layer => ', layer)
    }

    // TODO: post process: ol/layer/Layer properties => id/name/visible/opacity !!
    ['id', 'visible', 'zIndex', 'opacity'].forEach(propName => {
      let value = layerConfig[propName]
      if(value !== undefined) {
        layer.set(propName, value)
      }
    })

    // layer properties
    const layerProps = options.props || {}
    Object.keys(layerProps).forEach(propName => {
      layer.set(propName, layerProps[propName])
    })

    return layer
  }

  createLayerInternal(layerConfig, options) {
    throw new Error('operation not support')
  }

  checkLayerConfig(layerConfig, options) {
  }
}

let registry = LayerFactory.registry = {}
let instances = {}

LayerFactory.getInstance = function(type) {
  if(!registry[type]) {
    throw new Error(`Factory (${type}) not found`)
  }
  if(!instances[type]) {
    instances[type] = new registry[type]()
  }
  return instances[type]
}

LayerFactory.register = function(type, factory) {
  if(!!this.registry[type]) {
    throw new Error(`${type} layer factory already exists`)
  }
  this.registry[type] = factory
}

LayerFactory.unregister = function(type) {
  delete this.registry[type]
}

export {
  LayerFactory
}
