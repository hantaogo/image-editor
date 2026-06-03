/**
 * 从树中查询子节点
 * @param { Object } node 树节点
 * @param { Function } find 形如function(node) => XXX，XXX非空时停止遍历
 * @param { String } childrenKey 节点孩子数组的属性名，默认为children
 * @returns find函数返回非空时，返回XXX，如果没找到，返回null
 */
export function findTreeNode(node, find, childrenKey = 'children') {
  if (node instanceof Array) {
    for (const child of node) {
      const t = findTreeNode(child, find, childrenKey)
      if (t) {
        return t
      }
    }
    return null
  } else {
    const ok = find(node)
    if (ok) {
      return node
    } else if (node[childrenKey] instanceof Array) {
      return findTreeNode(node[childrenKey], find, childrenKey)
    } else {
      return null
    }
  }
}

// 遍历树，node为树节点，func形如function(node) => bool，返回true停止
export function mapTree(node, func, childrenKey = 'children') {
  if (node instanceof Array) {
    for (const child of node) {
      if (mapTree(child, func, childrenKey)) {
        return true
      }
    }
    return false
  } else if (node) {
    const ok = func(node)
    if (ok) {
      return true
    }
    return mapTree(node[childrenKey], func, childrenKey)
  } else {
    return false
  }
}

// 树形结构遍历（非递归，更快） tree: [...], func: (node) => { // ... })
export function mapTreeQuick(tree, func) {
  let node = null
  const list = [...tree]
  while ((node = list.shift())) {
    func(node)
    node.children && list.push(...node.children)
  }
  return tree
}

/**
 * 深度遍历对象或数组
 * @param any variable 要遍历的对象或数组
 * @param Function func 遍历函数\
 * (type, variable, objectOrArray, keyOrIndex) => {
 *   ...
 * }\
 * type: object | array 对象或数组\
 * variable: 当前遍历的对象或数组的元素\
 * objectOrArray: 当前遍历的对象或数组\
 * keyOrIndex: 当前遍历的对象或数组的键或索引
 */
export function trace(variable, func) {
  let type = ''
  if (variable && variable.constructor && variable.constructor === Object) {
    type = 'object'
  } else if (variable && variable.constructor && variable.constructor === Array) {
    type = 'array'
  }
  for (const k in variable) {
    func(type, variable[k], variable, k)
    trace(variable[k], func)
  }
}
