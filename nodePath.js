// 节点关系类
export class NodePath {
  constructor(node, parent, parentPath, key, brotherIndex) {
    this.node = node // 当前节点
    this.parent = parent // 父节点
    this.parentPath = parentPath // 父节点的NodePath实例
    this.key = key // 当前节点在父节点中的属性名
    this.brotherIndex = brotherIndex // 当前节点在兄弟节点中的索引
  }
  replaceWith(node) {
    // console.log('reolaceWidth: ', this.key, this.brotherIndex, this.parent)
    if (this.brotherIndex) {
      this.parent[this.key].splice(this.brotherIndex, 1, node)
    }
    this.parent[this.key] = node
  }
  remove() {
    if (this.brotherIndex) {
      this.parent[this.key].splice(this.brotherIndex, 1)
    }
    this.parent[this.key] = null
  }
}