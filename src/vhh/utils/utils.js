export const groupBy = function(arr, callback) {
  return arr.reduce((acc, cur) => {
    const key = callback(cur)
    if(!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}

export const keyBy = function(arr, callback) {
  return arr.reduce(
    (acc, cur) => Object.assign(acc, {[callback(cur)]: cur}), {})
}

// String#padStart !
export const leftPad = function(str, width, char = '0') {
  str = str + ''
  if(str.length >= width) {
    return str
  }
  const padding = char.repeat(width)
  return (padding + str).substr(-width)
}

// console.log(leftPad('123', 1))
// console.log(leftPad('123', 3))
// console.log(leftPad('123', 4))
// console.log(leftPad(123, 4))

/**
 * clone([deep], obj1, obj2)
 */
export const extend = () => {
  let extended = {}
  let deep = false
  let i = 0

  // Check if a deep merge
  if (typeof (arguments[0]) === 'boolean') {
    deep = arguments[0]
    i++
  }

  // Merge the object into the extended object
  let merge = function (obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge and the property is an object
          extended[prop] = extend(true, extended[prop], obj[prop])
        } else {
          // Otherwise, do a regular merge
          extended[prop] = obj[prop]
        }
      }
    }
  }

  // Loop through each object and conduct a merge
  for (; i < arguments.length; i++) {
    merge(arguments[i])
  }
  return extended
}

// partition
export const partition = (arr = [], chunkSize = 2) => {
  if(chunkSize >= arr.length) {
    return arr
  }
  let result = []
  for(let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }
  return result
}

// endWith
export const endWith = (str, search) => {
  return str.substring(str.length - search.length) === search
}

// startWith
export const startWith = (str, search) => {
  return str.substring(0, search.length) === search
}
