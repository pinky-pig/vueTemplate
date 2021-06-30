import {easeOut} from 'ol/easing.js'
import WKT from 'ol/format/WKT'
import {boundingExtent} from 'ol/extent'
import Point from 'ol/geom/Point'

const wktFormat = new WKT()

// ol/control/Zoom
export const zoomByDelta = function(map, options = {}) {
  let {
    delta = 1,
    duration = 250
  } = options
  /**
   * v6.x
   */
  const view = map.getView()
  if (!view) {
    return
  }
  const currentZoom = view.getZoom()
  if (currentZoom !== undefined) {
    const newZoom = view.getConstrainedZoom(currentZoom + delta)
    if (duration > 0) {
      if (view.getAnimating()) {
        view.cancelAnimations()
      }
      view.animate({
        zoom: newZoom,
        duration: duration,
        easing: easeOut
      })
    } else {
      view.setZoom(newZoom)
    }
  }

  /**
   * v5.x
  const view = map.getView()
  if (!view) {
    return
  }
  const currentResolution = view.getResolution()
  if (currentResolution) {
    const newResolution = view.constrainResolution(currentResolution, delta)
    if (duration > 0) {
      if (view.getAnimating()) {
        view.cancelAnimations()
      }
      view.animate({
        resolution: newResolution,
        duration: duration,
        easing: easeOut
      })
    } else {
      view.setResolution(newResolution)
    }
  }
   */
}

export const mapToCanvas = function(map, options = {}) {
  // const {} = options

  return new Promise((resolve) => {
    map.once('rendercomplete', () => {
      const mapSize = map.getSize()
      let mapCanvas = document.createElement('canvas')
      mapCanvas.width = mapSize[0]
      mapCanvas.height = mapSize[1]
      let mapContext = mapCanvas.getContext('2d')

      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        (canvas) => {
          if (canvas.width > 0) {
            let opacity = canvas.parentNode.style.opacity
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
            let transform = canvas.style.transform
            // Get the transform parameters from the style's transform matrix
            let matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number)
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            )
            mapContext.drawImage(canvas, 0, 0)
          }
        }
      )

      resolve(mapCanvas)
    })
    // 触发 render ?
    map.updateSize()
  })
}

/**
 * TODO: 参考 ol 示例, 考虑了在给定 宽高 的情况下输出 canvas
 *
 */
export const mapToCanvasXXX = function(map, options = {}) {
  const {
    width,
    height
  } = options

  const originSize = map.getSize()
  const originViewResolution = map.getView().getResolution()

  return new Promise((resolve) => {
    map.once('rendercomplete', () => {
      let mapCanvas = document.createElement('canvas')
      mapCanvas.width = width
      mapCanvas.height = height
      let mapContext = mapCanvas.getContext('2d')

      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        (canvas) => {
          if (canvas.width > 0) {
            let opacity = canvas.parentNode.style.opacity
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
            let transform = canvas.style.transform
            // Get the transform parameters from the style's transform matrix
            let matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number)
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            )
            mapContext.drawImage(canvas, 0, 0)
          }
        }
      )

      // Reset original map size
      map.setSize(originSize)
      map.getView().setResolution(originViewResolution)

      resolve(mapCanvas)
    })

    // Set print size
    const printSize = [width, height]
    map.setSize(printSize)
    const scaling = Math.min(width / originSize[0], height / originSize[1])
    map.getView().setResolution(originViewResolution / scaling)
  })
}

export const mergeCanvas = (canvasArr, options = {}) => {
  if(!Array.isArray(canvasArr)) {
    canvasArr = [canvasArr]
  }

  const {
    width = canvasArr[0].width,
    height = canvasArr[0].height
  } = options

  let newCanvas = document.createElement('canvas')
  newCanvas.width = width
  newCanvas.height = height
  let context = newCanvas.getContext('2d')

  canvasArr.forEach((canvas) => {
    console.log(1111, canvas)
    context.drawImage(canvas, 0, 0)
  })
  // console.log(width, height)
  return newCanvas
}

export const scale2resolution = function(scaleDenominator, dpi = 96) {
  return scaleDenominator * 0.0254000508 / dpi / 111194.872221777
}

export const ensure = function(value, name) {
  if(value === null || value == undefined) {
    throw new Error(`missing ${name}`)
  }
}

export const getChinaExtent = () => [73.6753792663, 18.197700914, 135.026311477, 53.4588044297]

export const getBJCoord = () => [116.3975, 39.906667]

// TODO: projection!
export const wktToGeometry = (wkt) => {
  return wktFormat.readGeometry(wkt)
}

// TODO: projection!
export const wktToCoords = (wkt) => {
  return wktToGeometry(wkt).getCoordinates()
}

export const coordsToWkt = (coords) => {
  return wktFormat.writeGeometry(new Point(coords))
}

export const coordsToExtent = (coords) => {
  return boundingExtent(coords)
}
