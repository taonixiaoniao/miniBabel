import { NodePath } from './nodePath.js'

// 存储AST节点定义
export const asDefinitionsMap = new Map()

// 遍历到type:Program节点时，执行其body属性的遍历
asDefinitionsMap.set('Program', {
  visitor: ['body']
})
// 遍历到type:VariableDeclaration节点时，执行其declarations属性的遍历
asDefinitionsMap.set('VariableDeclaration', {
  visitor: ['declarations']
})
// 遍历到type:VariableDeclarator节点时，执行其id和init属性的遍历
asDefinitionsMap.set('VariableDeclarator', {
  visitor: ['id', 'init']
})
// Identifier、NumberLiteral没有需要遍历的子节点，所以visitor属性为空对象
asDefinitionsMap.set('Identifier', {
  visitor: {}
})
asDefinitionsMap.set('NumberLiteral', {
  visitor: {}
})

// ast递归遍历处理函数
export const tranverse = (node, visitors = {}, parent, parentPath, key, brotherIndex) => {
  const { type } = node
  const { visitor } = asDefinitionsMap.get(type) || {}
  const visitorFuncObj = visitors[type] || {}

  // 创建节点关系实例
  const path = new NodePath(node, parent, parentPath, key, brotherIndex)

  // 执行节点的enter转化函数
  if (typeof visitorFuncObj.enter === 'function') {
    visitorFuncObj.enter(path)
  }

  // 节点的type有定义，则需要处理
  if (visitor) {
    Array.isArray(visitor) && visitor.forEach(visirotKey => {
      const children = node[visirotKey]
      Array.isArray(children) ? children.forEach((child, index) => tranverse(child, visitors, node, path, visirotKey, index)) : tranverse(children, visitors, node, path, visirotKey)
    })
  }

  // 执行节点的exit转化函数
  if (typeof visitorFuncObj.exit === 'function') {
    visitorFuncObj.exit(path)
  }
}

