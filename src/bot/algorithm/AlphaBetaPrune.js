const TreeNode = require('./TreeNode')
const Order = require('../order')
const DEPTH = 2

class AlphaBetaPrune
{
  /**
   * @param {TreeNode} tree 
   */
  constructor(tree) {
    this._tree = tree
  }

  get tree() { return this._tree }

  /**
   * @param {int} depth 
   * @return {Order}
   */
  findBestMove(depth = DEPTH) {
    
    return new Order()
  }
}

module.exports = AlphaBetaPrune