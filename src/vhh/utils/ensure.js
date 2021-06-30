/**
 * usage:
 * const x = require('throw-if-missing')
 * import {x} from '...ensure'
 * const login = ({ username = x`username`, password = x`password` } = {}) => {}
 *
 * ref: https://gist.github.com/MarkTiedemann/17ebf5b38b5b7566478de7f623e1defd
 */
export const throwIfMissing = (name, msg) => {
  msg = msg || `${name} is required.`
  throw new Error(msg)
}

// alias of throwIfMissing
export const x = throwIfMissing

// 方法体内手动调用执行
const ensure = (value, name) => {
  if(value === null || value == undefined) {
    throw new Error(`${name} is required.`)
  }
}

export default ensure
