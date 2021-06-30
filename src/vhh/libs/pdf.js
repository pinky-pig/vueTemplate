import { jsPDF } from 'jspdf'

// 宽x高 (mm)
export const dimensions = {
  a0: [841, 1189],
  a1: [594, 841],
  a2: [420, 594],
  a3: [297, 420],
  a4: [210, 297],
  a5: [148, 210],
}

/**
 * @param {string} format - a0/a1/a2...
 * @param {number} resolution - 72 (default) / 150 /  300
 */
export const getSize = (options = {}) => {
  const {
    format = 'a4',
    resolution = 72,
    landscape = false
  } = options
  const dim = dimensions[format]
  const width = Math.round((dim[0] * resolution) / 25.4)
  const height = Math.round((dim[1] * resolution) / 25.4)
  return landscape ? [height, width] : [width, height]
}


/**
 *
 */
export const canvasToPdf = (canvas, options = {}) => {
  const {width, height} = canvas
  const {
    format = 'a4',
    orientation = 'landscape'
  } = options

  const pdf = new jsPDF({
    format,
    orientation,
  })

  // https://stackoverflow.com/a/55497749
  const imgData = canvas.toDataURL('image/jpeg')
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(
    imgData,
    'JPEG',
    0,
    0,
    pdfWidth,
    pdfHeight
  )

  return pdf
}
