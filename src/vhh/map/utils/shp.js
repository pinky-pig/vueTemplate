import {open} from 'shapefile'

// do while - promise
const loopPromise = (promise, next, callback) => {
  return promise.then(result => {
    if(callback(result) === false) {
      return result
    } else {
      return loopPromise(next(), next, callback)
    }
  })
}

export const readShp = (shp, dbf, options) => {
  let {
    encoding = 'gbk',
    callback = (record) => {}
  } = options

  return open(shp, dbf, {encoding}).then(source => {
    return loopPromise(
      source.read(),
      () => source.read(),
      (data) => {
        if(data.done) {
          return false
        } else {
          callback(data.value)
          // if(data.value.type === 'Feature' && data.value.geometry) {}
        }
      }
    )
  })
}

