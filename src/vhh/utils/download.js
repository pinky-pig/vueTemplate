const download = (url, downloadName) => {
  let link = document.createElement('a')
  link.download = downloadName
  link.href = url
  link.click()
}

export default download
