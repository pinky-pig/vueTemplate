/**
 * axios interceptor
 *
 * - data.code
 * - data.data
 * - data.metadata
 *   - data.metadata.pagination
 */

const CONFIG_KEY_FLATTEN_DATA = 'flattenData'
const CONFIG_KEY_SKIP_RESPONSE_FORMAT = 'skipResponseFormat'
const isNullOrUndefined = (value) => value === null || value === undefined

export default function(options = {}) {
  const {
    // 嵌套 data 展平
    parseData = (response) => {
      if(response.config[CONFIG_KEY_FLATTEN_DATA] === false) {
        return response.data
      }
      const {data} = response
      if(isNullOrUndefined(data.data)) {
        return data
      }
      return data.data
    },
    parsePageMetadata = (response) => {
      return response.data.pageMetadata
    },
  } = options

  return function(response) {
    if(response.config[CONFIG_KEY_SKIP_RESPONSE_FORMAT]) {
      return response
    }
    const responseType = response.request.responseType
    if(responseType === '' || responseType === 'json') {
      let pageMetadata = parsePageMetadata(response)
      return {
        data: parseData(response),
        ...pageMetadata && {pageMetadata},
        response
      }
    }
    return response
  }
}

