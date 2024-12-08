# ECMAScript现状及其特性

`ECMAScript`是`javascript`的标准规范。

`ECMA`是一个国际化标准组织，定制`javascript`标准，最新的`js`标准是`ECMA-262`。

# babel

## babel工作流程

1. parser：将代码转化为`ast`，通过`acorn`库实现。
2. traverse：`ast`解析，得到中间产物。深度优先遍历`ast`树，对每个节点进行处理。
3. generate：将中间产物转化为最终代码。
