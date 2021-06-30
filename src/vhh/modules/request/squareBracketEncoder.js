/**
 * axios request interceptor, 用于编码中括号字符 `[|]`
 *
 * 参考: [axios中的参数为啥没被编码 · 语雀](https://www.yuque.com/liujigang/fe/pbn67i)
 */
export default function(config) {
  if(!config.params) {
    return config
  }
  Object.keys(config.params).forEach(key => {
    const value = config.params[key]
    if(typeof value === 'string') {
      config.params[key] = value
        .replace(/[\[\]]/g, (match) => encodeURIComponent(match))
    }
  })
  return config
}
