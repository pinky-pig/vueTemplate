import {keyBy, groupBy} from './utils'

function array2tree (arr, options) {
  if(!arr || arr.length === 0) {
    return arr
  }
  options || (options = {})

  const idKeyName = options.idKeyName || 'id'
  const pidKeyName = options.pidKeyName || 'pid'
  const sorter = options.sorter || ((a, b) => a.sortIndex - b.sortIndex)
  // const custom = options.custom || function () {}

  const copy = [...arr]

  let result
  const keyById = keyBy(copy, item => item[idKeyName])
  const groupByPid = groupBy(copy, item => item[pidKeyName])

  Object.keys(groupByPid).forEach(pid => {
    let nodes = groupByPid[pid]
    const parentNode = keyById[pid]
    // 最上级结点
    if (!parentNode) {
      result = nodes.sort(sorter)
    } else {
      parentNode.children = nodes.sort(sorter)
    }
  })

  return result
}

export default array2tree
