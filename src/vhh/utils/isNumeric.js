// refs: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
export default function isNumeric(str) {
  // we only process strings!
  if (typeof str != 'string') {
    return false
  }
  // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  // ...and ensure strings of whitespace fail
  return !isNaN(str) && !isNaN(parseFloat(str))
}
