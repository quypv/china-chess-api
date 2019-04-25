// const NODE = {
//   parent: null,
//   depth: 0,
//   value: null,
//   context: null,
//   children: [], 
// }

class TreeNode
{
  /**
   * @param {Object} node 
   */
  constructor() {
    this._children = []
    this._value = 'test'
    this._parent = null
    this._context = {}
    this._depth = 0
  }

  // get data()           { return this._data }
  get context()        { return this._context }
  get parent()         { return this._parent }
  get children()       { return this._children }
  get value()          { return this._value }
  get depth()          { return this._depth }

  set context(context) { this._context = context }
  set value(value)     { this._value = value }
  set parent(node)     { this._parent = node }
  set depth(depth)     { this._depth = depth }

  push(node) {
    node.parent = this
    this._children.push(node)
  }

  echoValue() {
    return `${this.value} (${this.context})`
  }

  isLeaf() {
    return !this._children.length
  }

  printTree(indent = '') {
    let str = indent

    if (this.isLeaf()) {
      str += "\\_";
      indent += "  ";
    }
    else {
      str += "|_";
      indent += "| ";
    }

    str += this.echoValue()
    console.log(str)

    for (let child of this._children) {
      child.printTree(indent)
    }

    return
  }
}

module.exports = TreeNode