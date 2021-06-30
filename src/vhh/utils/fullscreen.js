export const requestFullscreen = () => {
  if (document.fullscreenEnabled) {
    document.documentElement.requestFullscreen()
  } else {
    console.log('warning: fullscreen is not supported!')
  }
}

export const exitFullscreen = () => {
  if (document.fullscreenEnabled) {
    document.exitFullscreen()
  } else {
    console.log('warning: fullscreen is not supported!')
  }
}

export const toggleFullscreen = (flag) => {
  let enable = !document.fullscreenElement
  if(typeof flag === 'boolean') {
    enable = flag
  }
  if (enable) {
    requestFullscreen()
  } else {
    exitFullscreen()
  }
}
