const _makeObjectNonreactive = (object) => {
  Object.keys(object).forEach((key)=>{
    Object.defineProperty(object, key, { configurable: false })
  })
  return object
}

export const makeNonreactive = (object) => {
  if(Array.isArray(object)) {
    return object.map(this._makeObjectNonreactive)
  } else {
    return this._makeObjectNonreactive(object)
  }
}
