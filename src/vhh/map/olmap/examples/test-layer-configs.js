export default {

  'ogc-wmts': {
    'tianditu_vec_c': {
      "name": "天地图-矢量底图",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "vec",
      "style": "default",
      "format": "tiles"
    },
    'tianditu_cva_c': {
      "name": "天地图-矢量注记",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "cva",
      "style": "default",
      "format": "tiles"
    },
    'tianditu_img_c': {
      "name": "天地图-影像底图",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/img_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "img",
      "style": "default",
      "format": "tiles"
    },
    'tianditu_cia_c': {
      "name": "天地图-影像注记",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/cia_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "cia",
      "style": "default",
      "format": "tiles"
    },
    'tianditu_ter_c': {
      "name": "天地图-地形晕渲",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/ter_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "ter",
      "style": "default",
      "format": "tiles"
    },
    'tianditu_cta_c': {
      "name": "天地图-地形注记",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://t{0-7}.tianditu.gov.cn/cta_c/wmts?tk=de5ad7492e083c32ac321d0e7aa97a11",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"c",
      "layer": "cta",
      "style": "default",
      "format": "tiles"
    },
    'SX_GQGB_JMDSS': {
      "name": "江苏省影像底图（2014）",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://shanxi.tianditu.gov.cn/service/SX_GQGB/wmts",
      "originX":-180,
      "originY":90,
      "coordinates":"4326",
      "matrixSet":"Matrix_JMDSS_0",
      "resolutions": "0.010986328329934226,0.005493164164967124,0.0027465820824835506,0.0013732910412417798,0.0006866455206208899",
      "matrixIds": "7,8,9,10,11",
      "layer": "JMDSS",
      "style": "JMDSS",
      "format": "image/tile"
    },
    'SX_GQGB_HBFJ': {
      "name": "江苏省影像底图（2014）",
      "serverType": "wmts",
      "visible": true,
      "useType": "base",
      "serviceURL": "http://shanxi.tianditu.gov.cn/service/SX_GQGB/wmts",
      "originX":"-180",
      "originY":"90",
      "coordinates":"4326",
      "matrixSet":"Matrix_HBFJ_0",
      "resolutions": "0.010986328329934226,0.005493164164967124,0.0027465820824835506,0.0013732910412417798,0.0006866455206208899",
      "matrixIds": "7,8,9,10,11",
      "layer": "HBFJ",
      "style": "HBFJ",
      "format": "image/tile"
    }
  },

  'custom-wmts': {
    '水利专题图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/水利专题图",
      "visiable":"0",
      "xmin":0,
      "xmax":0,
      "ymin":0,
      "ymax":0,
      "coordinates":4490,
      "originX":-180,
      "originY":90,
      "resolution":"0.17578125327894775,0.08789062663947399,0.043945313319736994,0.021972656659868472,0.010986328329934226,0.005493164164967124,0.0027465820824835504,0.0013732910412417797,0.0006866455206208899,0.0003433227603104438,0.0001716613801552224,0.00008583069007761132,0.00004291534503880566,0.000021457672519402802,0.000010728836259701401",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    },
    '5万地质图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/5万地质图",
      "visiable":"0",
      "coordinates":4326,
      "originX":-180,
      "originY":90,
      "resolution":"1.406250000000,0.703125000000,0.351562500000,0.175781250000,0.087890625000,0.043945312500,0.021972656250,0.010986328125,0.005493164062,0.002746582031,0.001373291016,0.000686645508,0.000343322754,0.000171661377,0.000085830688,0.000042915344",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    },
    '20万地质图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/20万地质图",
      "visiable":"0",
      "coordinates":4326,
      "originX":-180,
      "originY":90,
      "resolution":"1.406250000000,0.703125000000,0.351562500000,0.175781250000,0.087890625000,0.043945312500,0.021972656250,0.010986328125,0.005493164062,0.002746582031,0.001373291016,0.000686645508,0.000343322754",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    },
    '50万地质图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/50万地质图",
      "visiable":"0",
      "coordinates":4326,
      "originX":-180,
      "originY":90,
      "resolution":"1.406250000000,0.703125000000,0.351562500000,0.175781250000,0.087890625000,0.043945312500,0.021972656250,0.010986328125,0.005493164062,0.002746582031,0.001373291016,0.000686645508,0.000343322754",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    },
    '100万地质图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/100万地质图",
      "visiable":"0",
      "coordinates":4326,
      "originX":-180,
      "originY":90,
      "resolution":"1.406250000000,0.703125000000,0.351562500000,0.175781250000,0.087890625000,0.043945312500,0.021972656250,0.010986328125,0.005493164062,0.002746582031,0.001373291016,0.000686645508,0.000343322754",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    },
    '250万地质图': {
      "serviceURL":"http://www.jshhxx.cn/WMTSService38/250万地质图",
      "visiable":"0",
      "coordinates":4326,
      "originX":-180,
      "originY":90,
      "resolution":"1.406250000000,0.703125000000,0.351562500000,0.175781250000,0.087890625000,0.043945312500,0.021972656250,0.010986328125,0.005493164062,0.002746582031,0.001373291016,0.000686645508,0.000343322754",
      "tileSize":256,
      "matrixSet":"",
      "matrixIds":"",
      "layer":"",
      "style":"",
      "format": "image/tile"
    }
  },

  'arcgis-tiles': [
    {
      name: '水利公共类/中型水库',
      url: 'http://www.jshhxx.cn/arcgis/rest/services/%E6%B0%B4%E5%88%A9%E5%85%AC%E5%85%B1%E7%B1%BB/%E4%B8%AD%E5%9E%8B%E6%B0%B4%E5%BA%93/MapServer',
      projection: 'EPSG:4326',
      tileSize: 256,
      "originX":-180,
      "originY":90,
      resolutions: "0.08789062663947399,0.043945313319736994,0.021972656659868472,0.010986328329934226,0.005493164164967124,0.0027465820824835504,0.0013732910412417797,6.866455206208899E-4,3.433227603104438E-4,1.716613801552224E-4,8.583069007761132E-5,4.291534503880566E-5,2.1457672519402802E-5,1.0728836259701401E-5",
    }
  ],

  'arcgis-dynamic': [
    {
      name: '古树一级',
      url: 'http://www.jshhxx.cn/arcgis/rest/services/%E5%8F%A4%E6%A0%91%E4%B8%80%E7%BA%A7/MapServer/0'
    }
  ]

}
