import {getUid} from 'ol/util'
export {default as BaselayerSwitch} from './BaselayerSwitch'

/**
 *
 * @param {Object} openlayer Layer instance
 * @param {Object} options
 * @param {Object} layerInfo
 *        {string} layerInfo.name - 名称 (optional)
 *        {string} layerInfo.alias - 别名/显示名称
 *        {string} layerInfo.image - 用于显示的图标/图片
 * @return {Object} layerBinding
 *         {string} layerInfo.name - 名称 (唯一)
 */
const bindLayer = (layer, options) => {
}

/**
 *
 * @param {Object[]} bindingOptions
 * @param {string} bindingOptions[].layer - openlayers 图层
 * @param {string} bindingOptions[]...
 *
 * @return {Object[]} - bindings
 */
export const bindLayers = (bindingOptions) => {
  const bindings = bindingOptions.map(item => {
    const {
      layer,
      name,
      alias,
      image,
      visible = false
    } = item

    const uid = getUid(layer)
    return {
      uid,
      name,
      alias,
      image,
      visible
    }
  })
  return bindings
}
