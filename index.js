import { Parser } from 'acorn'
import { tranverse } from './tranverse.js'
import { generate } from './generator.js'

// 原版Parser使用
const ast = Parser.parse(`
  const a = 1
`)
// console.log(JSON.stringify(ast, null, 2))

// 手动定制Parser，babel核心原理
const literalExtend = (Parser) => {
  // 返回一个类，继承自Parser
  return class extends Parser {
    parseLiteral(...args) {
      const node = super.parseLiteral(...args)
      // console.log('node: ', node)
      // 这里示例只处理string和number类型
      switch (typeof node.value) {
        case 'string':
          node.type = 'StringLiteral'
          break
        case 'number':
          node.type = 'NumberLiteral'
          break
        default:
      }
      return node
    }
  }
}

const newParser = Parser.extend(literalExtend)

const ast2 = newParser.parse(`
  const a = 1, aa = 4
  const b = 'hello'
`)

// 定义单个AST节点处理回调函数

function enterIdentifier(path) {
  // path.node.name = 'x'
}

function exitIdentifier(path) {
  // path.node.name = 'c'
}

function enterNumberLiteral(path) {
  // path.replaceWith({ type: 'Identifier', name: 'eee' })
  if (path.node.value === 1) {
    const expressionNode = Parser.parse('yuanzhoulv').body[0].expression
    // console.log((JSON.stringify(expressionNode, null, 2)))
    path.replaceWith(expressionNode)
  }
}

function exitNumberLiteral(path) {
  // path.node.value = 3
}

const visitors = {
  Identifier: {
    enter: enterIdentifier,
    exit: exitIdentifier
  },
  NumberLiteral: {
    enter: enterNumberLiteral,
    exit: exitNumberLiteral
  }
}

tranverse(ast2, {
  Identifier: visitors.Identifier,
  NumberLiteral: visitors.NumberLiteral
})

console.log(JSON.stringify(ast2, null, 2))

console.log(generate(ast2))

