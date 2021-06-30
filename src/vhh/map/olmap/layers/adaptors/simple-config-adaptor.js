const isNullOrUndefined = function(value) {
  return value === null || value === undefined
}

export default function(config, factory) {

  let c = {
    ...config
  }

  if(c.serviceURL) {
    c.url = c.serviceURL
  }

  if(c.coordinates)  {
    c.projection = c.coordinates
  }

  if(c.projection && (c.projection + '').indexOf('EPSG:') !== 0) {
    c.projection = 'EPSG:' + c.projection
  }

  if(!isNullOrUndefined(c.originX) && !isNullOrUndefined(c.originY)) {
    c.origin = [c.originX, c.originY]
  }

  // string => number
  if(c.origin && typeof c.origin[0] === 'string') {
    c.origin = [Number(c.origin[0]), Number(c.origin[1])]
  }

  if(c.resolution) {
    c.resolutions = c.resolution
  }

  if(typeof c.resolutions === 'string') {
    c.resolutions = c.resolutions.split(',')
      .map(item => Number(item))
  }

  // TODO: matrixIds 仅针对 wmts ?
  if(!!c.matrixIds && typeof c.matrixIds === 'string') {
    c.matrixIds = c.matrixIds.split(',')
    // .map(item => Number(item))
  }
  if(!c.matrixIds && c.resolutions) {
    c.matrixIds = c.resolutions.map((item, index) => index)
  }

  return c
}
