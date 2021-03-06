/*
 * @Date: 2021-06-29 14:35:34
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 19:50:44
 * @FilePath: \vuetemplate\src\modules\request.js
 */
import axios from 'axios'
import responseFormatter from 'vhh/modules/request/responseFormatter'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API
})

// response 格式化
const responseFormatterInterceptor = responseFormatter({
  // 分页数据解析
  parsePageMetadata: (response) => {
    if(typeof response.data !== 'object') {
      return
    }
    if('pageMetadata' in response.data) {
      return response.data.pageMetadata
    } else if ('total' in response.data) {
      return {
        total: response.data.total
      }
    }
  },
})

instance.interceptors.response.use(
  responseFormatterInterceptor,
  (error) => Promise.reject(error)
)

export default instance