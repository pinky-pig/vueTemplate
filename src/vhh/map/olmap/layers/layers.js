import {LayerFactory} from './layer-factory'

/**
 * 默认加载 factories 目录下的所有模块, ext 中的模块可自行使用 `LayerFactory.register(type, module)` 注册
 */
const req = require.context('./factories', false, /\w+\.js$/)

req.keys().map(filename => {
  let module = req(filename).default
  // "a-b.js" => "a-b"
  // let type = filename.match(/([\w-]+)\.js/)[1]
  let type = module.LAYER_TYPE
  if(!type) {
    throw new Error(`missing Factory of LAYER_TYPE - ${module}`)
  }
  // console.log(type, filename, module)
  LayerFactory.register(type, module)
})

// console.log(`Layer Factory registry => `, LayerFactory.registry)

// facade
const createLayer = function(type, layerConfig, options) {
  let factory = LayerFactory.getInstance(type)
  return factory.createLayer(layerConfig, options)
}

// layerConfigs 数组元素需要包含 type 信息
const createLayers = function(layerConfigs, options) {
}

export {
  createLayer,
  createLayers
}
