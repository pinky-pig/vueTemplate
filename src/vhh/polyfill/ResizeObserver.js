import { ResizeObserver } from '@juggle/resize-observer'

if ('ResizeObserver' in window === false) {
  window.ResizeObserver = ResizeObserver
}

// (async () => {
//   if ('ResizeObserver' in window === false) {
//     // Loads polyfill asynchronously, only if required.
//     const module = await import('@juggle/resize-observer');
//     window.ResizeObserver = module.ResizeObserver;
//   }
//   // Uses native or polyfill, depending on browser support.
//   const ro = new ResizeObserver((entries, observer) => {
//     console.log('Something has resized!');
//   });
// })();
