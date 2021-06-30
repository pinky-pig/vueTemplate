import proj4 from 'proj4'
import XYZ from 'ol/source/XYZ'
import TileImage from 'ol/source/TileImage'
import TileLayer from 'ol/layer/Tile'
import projzh from 'projzh'
import TileGrid from 'ol/tilegrid/TileGrid'
import {applyTransform} from 'ol/extent'
import {Projection, addProjection, addCoordinateTransforms, transformExtent} from 'ol/proj'
import {register} from 'ol/proj/proj4'
import {LayerFactory} from '../../layer-factory'

/**
 * https://www.giserdqy.com/secdev/openlayers/114/
 */
class BaiduFactory extends LayerFactory {

  createLayerInternal(layerConfig = {}, options) {

    const {
      // layer: vec/img
      layer = 'vec',
      crossOrigin
    } = layerConfig

    let bd09Extent = [-20037726.37, -12474104.17, 20037726.37, 12474104.17]
    let baiduMercator = new Projection({
      code: 'baidu',
      extent: bd09Extent,
      units: 'm'
    })
    addProjection(baiduMercator)
    addCoordinateTransforms(
      'EPSG:4326',
      baiduMercator,
      projzh.ll2bmerc,
      projzh.bmerc2ll
    )
    addCoordinateTransforms(
      'EPSG:3857',
      baiduMercator,
      projzh.smerc2bmerc,
      projzh.bmerc2smerc
    )

    let bmercResolutions = new Array(19)
    for (let i = 0; i < 19; ++i) {
      bmercResolutions[i] = Math.pow(2, 18 - i)
    }

    let baiduSource
    /**
     * 矢量
     */
    if(layer === 'vec') {
      baiduSource = new XYZ({
        projection: 'baidu',
        wrapX: true,
        url:
          'http://maponline{0-3}.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20191119',
        tileGrid: new TileGrid({
          minZoom: 3,
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: bd09Extent,
          // tileSize: [512,512] // 配合 z - 1
        }),
        crossOrigin
      })
      let xyzTileUrlFunction = baiduSource.getTileUrlFunction()
      let tmsTileUrlFunction = function([z, x, y]) {
        return xyzTileUrlFunction([z, x, -y - 1])
        // return xyzTileUrlFunction([z - 1, x, -y - 1])
      }
      baiduSource.setTileUrlFunction(tmsTileUrlFunction)
    } else if(layer === 'img') {
      /**
      * 矢量
      */
      baiduSource = new TileImage({
        projection: 'baidu',
        crossOrigin,
        tileGrid: new TileGrid({
          minZoom: 3,
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: bd09Extent,
          // tileSize: [512,512] // 配合 z - 1
        }),
        tileUrlFunction: function(tileCoord, pixelRatio, proj) {
          var z = tileCoord[0]
          var x = tileCoord[1]
          var y = -tileCoord[2] - 1
          // 百度瓦片服务url将负数使用M前缀来标识
          if (x < 0) {
            x = 'M' + (-x)
          }
          if (y < 0) {
            y = 'M' + (-y)
          }
          return 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x +
              ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606'
        }
      })
    }

    let baidu = new TileLayer({
      source: baiduSource
    })
    return baidu
  }

  checkLayerConfig() {
  }
}

BaiduFactory.LAYER_TYPE = 'baidu'

export default BaiduFactory
