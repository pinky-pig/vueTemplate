import {Vector as VectorLayer} from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style'

import {LayerFactory} from '../layer-factory'

const image = new CircleStyle({
  radius: 4,
  fill: new Fill({color: 'blue'}),
  stroke: new Stroke({color: 'red', width: 1}),
})

const styles = {
  'Point': new Style({
    image: image,
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 2,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiPoint': new Style({
    image: image,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
}

function isFunction(value) {
  return typeof value === 'function'
}

/**
 * feature
 */
class FeatureLayerFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {

    let {
      projection = 'EPSG:4326',
      geoJson,
      styleFunc = (feature) => {
        let style = styles[feature.getGeometry().getType()]
        let label = feature.getProperties().label
        if(label) {
          style.setText(new Text({
            text: label,
            offsetX: -20,
            offsetY: -20,
            fill: new Fill({color: '#fff'}),
            backgroundFill: new Fill({color: '#000'})
          }))
        }
        return style
      }
    } = layerConfig

    const format = new GeoJSON()

    let vectorSource = new VectorSource({
      features: format.readFeatures(geoJson)
    })

    return new VectorLayer({
      source: vectorSource,
      style: styleFunc
    })
  }
  checkLayerConfig() {
  }
}

FeatureLayerFactory.LAYER_TYPE = 'feature'

export default FeatureLayerFactory
