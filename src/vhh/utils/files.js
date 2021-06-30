export const basename = (path, ext = false) => {
  let result = path.replace(/^.+\//, '')
  return ext ? result : result.replace(/\.\w+$/, '')
}

export const extname = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1) || filename
}

