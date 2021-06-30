import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

import {LayerFactory} from '../../layer-factory'

// 古树一级 http://www.jshhxx.cn/arcgis/rest/services/%E5%8F%A4%E6%A0%91%E4%B8%80%E7%BA%A7/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=html
/**
 * arcgis-feature
 */
class ArcgisFeatureFactory extends LayerFactory {

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
      style = 'default',

      ...rest
    } = layerConfig

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
  checkLayerConfig() {
  }
}

ArcgisFeatureFactory.LAYER_TYPE = 'arcgis-feature'

export default ArcgisFeatureFactory
