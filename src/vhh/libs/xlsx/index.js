import XLSX from 'xlsx'

// an array of arrays data
export const writeAOA = (aoa, options = {}) => {

  let {
    download = true,
    // 注意提供扩展名
    filename = 'Sheet.xlsx'
  } = options

  var wb = XLSX.utils.book_new()
  var ws = XLSX.utils.aoa_to_sheet(aoa)
  XLSX.utils.book_append_sheet(wb, ws, "Sheet 1")

  if(download) {
    /* Trigger Download with `writeFile` */
    XLSX.writeFile(wb, filename, { compression:true })
  } else {
    XLSX.write(wb, { compression:true })
  }
}
