const c = require('../base/constants')
const Base = require('./base')
const Analytic = require('./analytic')
const Order = require('./order')
const Strategy = require('./strategy')
const StrategyPoint = require('./strategyPoint')
const TreeNode = require('./algorithm/TreeNode')
const MinimaxNode = require('./algorithm/MinimaxNode')
const Match = require('../base/match')
const Render = require('../base/render')
const { ScanMovesFlow } = require('../base/flow')

const EARLY_SAFE_POINT_LIMIT = 40
const DEPTH_MAX = 2

class BotOne extends Base
{
  /**
   * 
   * @param {Analytic} analytic 
   * @return {Order}
   */
  algorithm(analytic) {
    return this._strategy.alphaBetaPruner(
      this.buildTree(analytic)
    )
  }

  /**
   * @param {Analytic} analytic 
   * @return {TreeNode}
   */
  buildTree(analytic) {
    let tree = new MinimaxNode(
      null, 
      analytic.color,
      analytic.match.board.encode(),
      new Order(),
      0
    )
    this.grow(tree, tree.color)

    console.log(ScanMovesFlow.getCount())
    
    // tree.printTree()

    return tree
  }

  grow(node, rootColor, foundWinner = false, maxDepth = DEPTH_MAX) {
    //Leaf reached: calculate point
    if (node.depth === maxDepth || foundWinner) {
      let analytic = new Analytic(new Match(node.boardEncode), rootColor)
      // node.point = this._strategy.calculateHealthPoint(analytic).health - this._strategy.calculateStrategyPoint(analytic).sum / 2
      node.point = this._strategy.calculateHealthPoint(analytic).health
      return;
    }

    //Grow
    let analytic = new Analytic(new Match(node.boardEncode), node.color)
    let troops = analytic.getAllyTroops()

    for (let troop of troops) {
      troop.calculateMoves(analytic.match.board)
      let moves = Object.keys(troop.moves.getCapture())
      let randGoodFreeMove = this._strategy.randomGoodFreeMove(troop)
      if (randGoodFreeMove.valid()) {
        moves.push(randGoodFreeMove.toPos)
      }

      let fromPos = troop.pos

      for (let toPos of moves) {
        
        let matchNext = new Match(node.boardEncode)
        // ScanMovesFlow.lock()
        // let troop = matchNext.board.at(fromPos)
        matchNext.move(fromPos, toPos)
        // ScanMovesFlow.release()
        
        let childNode = new MinimaxNode(
          node, 
          node.color === c.BLACK ? c.RED : c.BLACK,
          matchNext.board.encode(),
          new Order(fromPos, toPos, troop.symbol),
          node.depth + 1
        )
        node.push(childNode)

        this.grow(childNode, rootColor, matchNext.isEnded())
      }
    }
  }
}

module.exports = BotOne