const TreeNode = require('./TreeNode')
const Order = require('../order')

class MinimaxNode extends TreeNode
{
  constructor(parent, color, strBoardState, order, depth) {
    super()
    this.parent = parent
    this.color = color
    this.boardEncode = strBoardState
    this.move = order
    this.depth = depth
  }

  get color()  { return this._context.color }
  get point()  { return this._value }
  get move()   { return this._context.order }
  get boardEncode() { return this._context.boardEncode }
  get troopEncode() { return this._context.troopEncode }
  
  /**
   * @param {string} color
   */
  set color(color) { 
    this._context.color = color 
  }
  /**
   * @param {int} point
   */
  set point(point) { 
    this._value = point 
  }
  /**
   * @param {Order} order
   */
  set move(order) { 
    this._context.order = order 
  }
  /**
   * @param {string} strSymbolPos
   */
  set troopEncode(strSymbolPos) {
    this._context.troopEncode = strSymbolPos
  }
  /**
   * @param {string} strBoardState
   */
  set boardEncode(strBoardState) {
    this._context.boardEncode = strBoardState
  }

  echoValue() {
    return `${this.move.toString()} ${this.value ? this.value : '' }`
  }

}

module.exports = MinimaxNode