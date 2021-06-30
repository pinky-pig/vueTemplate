// 广度优先
function BFS(nodes, callback) {

  let queue = [...nodes]
  let breakFlag = false

  while(queue.length > 0 && !breakFlag) {
    let node = queue.shift()
    let result = callback(node)
    if(result === false) {
      breakFlag = true
    }
    if(node.children) {
      Array.prototype.push.apply(queue, node.children)
    }
  }
}

// 深度优先
function DFS(nodes, callback, parent) {

  function processNode(node, callback) {
    if(node.children) {
      let result = node.children.every(node => processNode(node, callback, node))
      if(!result) {
        return false
      }
    }
    return callback(node, parent) === false ? false : true
  }

  nodes.every(node => {
    return processNode(node, callback)
  })
}

// 遍历 tree
function walkTree(tree, callback, options = {}) {
  options = {
    childrenKeyName: 'children',
    type: 'BFS',
    ...options
  }
  if(options.type === 'BFS') {
    BFS(tree, callback)
  } else {
    DFS(tree, callback)
  }
}

function mapTreeNode(node, mapper, options, mappedParent) {
  let copy = {...node}
  let mappedNode = mapper(copy, mappedParent)
  if(node.children) {
    // children 为空数组且 removeEmptyChildren 为 true 时, children 属性置空
    if(node.children.length === 0 && options.removeEmptyChildren) {
      mappedNode.children = null
    } else {
      mappedNode.children = node.children.map(child => mapTreeNode(child, mapper, options, mappedNode))
    }
  }
  return mappedNode
}

// 转换 tree node
function mapTree(tree, mapper, options) {
  options = {
    childrenKeyName: 'children',
    // children 为空数组时是否删除 children 属性, 默认删除 (不保留)
    removeEmptyChildren: true,
    ...options
  }
  return tree.map(item => mapTreeNode(item, mapper, options))
}


// find
function find(tree, match, options) {
  options = {
    childrenKeyName: 'children',
    type: 'BFS',
    ...options
  }

  let matched
  function callback(node) {
    if(match(node)) {
      matched = node
      return false
    }
  }

  if(options.type === 'BFS') {
    BFS(tree, callback)
  } else {
    DFS(tree, callback)
  }

  return matched
}

// flattenTree
export const flattenTree = function (tree) {
  return tree.reduce((acc, cur) => {
    acc.push(cur)
    if(cur.children) {
      Array.prototype.push.apply(acc, flattenTree(cur.children))
    }
    return acc
  }, [])
}

export {
  walkTree,
  mapTree,
  find,
  flattenTree
}


