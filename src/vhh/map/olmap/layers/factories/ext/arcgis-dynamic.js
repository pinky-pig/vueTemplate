import EsriJSON from 'ol/format/EsriJSON'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import {fromLonLat} from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import {createXYZ} from 'ol/tilegrid'

import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

import {LayerFactory} from '../../layer-factory'

/**
 * arcgis-dynamic
 */
class ArcgisDynamicFactory extends LayerFactory {

  createLayerInternal(layerConfig, options) {

    let {
      url,
      projection = 'EPSG:4326',
      // origin = [-180, 90],
      // tileSize = 256,
      // resolutions,
      // matrixIds,
      // style = 'default',
    } = layerConfig

    let vectorSource = new VectorSource({
      loader: function (extent, resolution, projections) {

        let u = url + '/query/?f=json&'
                + 'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                  encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                  extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                  ',"spatialReference":{"wkid":' + '' + '}}') +
                '&geometryType=esriGeometryEnvelope&inSR=' + '' + '&outFields=*' +
                '&outSR=' + ''
        axios({
          url: u,
          adapter: jsonpAdapter,
          callbackParamName: 'c', // optional, 'callback' by default
          // baseURL: null,
        }).then((res) => {
            // console.log(res)
          if (res.error) {
            console.log(res.error.message + '\n' + res.error.details.join('\n'))
          } else {
            // dataProjection will be read from document
            var features = esrijsonFormat.readFeatures(res.data, {
              featureProjection: projections
            })
            if (features.length > 0) {
                vectorSource.addFeatures(features);
            }
          }
        })
      },
      strategy: tileStrategy(
        createXYZ({
          tileSize: 512
        })
      )
    })

    return new VectorLayer({
      source: vectorSource
    })
  }
  checkLayerConfig() {
  }
}

ArcgisDynamicFactory.LAYER_TYPE = 'arcgis-dynamic'

export default ArcgisDynamicFactory
