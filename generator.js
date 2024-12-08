const isFunction = val => typeof val === 'function'

export class Printer {
  constructor() {
    this.buf = ''
  }

  // 处理空格
  space() {
    this.buf += ' '
  }

  // 处理换行
  nextLine() {
    this.buf += '\n'
  }

  // 处理整个代码块，即Program节点
  Program(node) {
    node.body.forEach(item => {
      if (isFunction(this[item.type])) {
        this[item.type](item)
      }
      this.nextLine()
    })
  }

  // 处理变量声明，即VariableDeclaration节点
  VariableDeclaration(node) {
    // 处理变量声明的关键字，如const、let
    this.buf += node.kind
    this.space()
    node.declarations.forEach((item, index) => {
      // 关键字+逗号连续声明多个变量的情况，除第一个外，其他变量前加逗号
      if (index !== 0) {
        this.buf += ','
      }
      if (isFunction(this[item.type])) {
        this[item.type](item)
      }
    })
    this.buf += ';'
  }

  // 处理变量声明中单个声明，即VariableDeclarator节点
  VariableDeclarator(node) {
    this[node.id.type](node.id)
    this.buf += '='
    if (isFunction(this[node.init.type])) {
      this[node.init.type](node.init)
    }
  }

  // 处理标识符，即Identifier节点，let a = 1 中的a
  Identifier(node) {
    this.buf += node.name
  }

  // 处理数字字面量，即NumberLiteral节点
  NumberLiteral(node) {
    this.buf += node.value
  }

  // 处理字符串字面量，即StringLiteral节点
  StringLiteral(node) {
    this.buf += node.value
  }
}

export class Generator extends Printer {
  generate(node) {
    this[node.type](node)
    return this.buf
  }
}

export const generate = (node) => {
  const generator = new Generator()
  return generator.generate(node)
}