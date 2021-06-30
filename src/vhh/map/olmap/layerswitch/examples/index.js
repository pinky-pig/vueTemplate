// examples setup
const exampleRoutes = [
  {
    path: '/layerswitch/examples/example1',
    component: () => import('./Example1'),
  }
]

export default function(routes) {
  exampleRoutes.forEach(route => routes.push(route))
}
