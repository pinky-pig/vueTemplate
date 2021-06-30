// https://github.com/electron/electron/issues/2288#issuecomment-337858978
export const inElectronApp = () => {
  let userAgent = navigator.userAgent.toLowerCase()
  return userAgent.indexOf(' electron/') > -1
}
