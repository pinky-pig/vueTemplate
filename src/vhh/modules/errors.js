
export class SimpleError extends Error {
  constructor(message, cause) {
    super(message)
    this.cause = cause
    this.name = this.constructor.name
    this.properties = {}
  }

  setProperty(key, value) {
    this.properties[key] = value
    return this
  }
}
