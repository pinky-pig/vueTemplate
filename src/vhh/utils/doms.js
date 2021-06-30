export const getWidth = (el) => {
  return parseFloat(getComputedStyle(el, null).width.replace('px', ''))
}

export const getHeight = (el) => {
  return parseFloat(getComputedStyle(el, null).height.replace('px', ''))
}
