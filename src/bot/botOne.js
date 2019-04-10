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

const EARLY_SAFE_POINT_LIMIT = 40
const DEPTH_MAX = 4

class BotOne extends Base
{
  /**
   * 
   * @param {Analytic} analytic 
   * @return {Order}
   */
  algorithm(analytic) {
    let strategy = new Strategy()
    // let point = strategy.calculateStrategyPoint(analytic)
    // console.log('POINT', point.sum, point.print())

    // return strategy.pickRandomMove(analytic)

    return strategy.alphaBetaPruner(
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
    
    tree.printTree()

    return tree
  }

  grow(node, rootColor, foundWinner = false, maxDepth = DEPTH_MAX) {
    let strategy = new Strategy()

    //Leaf reached: calculate point
    if (node.depth === maxDepth || foundWinner) {
      let analytic = new Analytic(new Match(node.boardEncode), rootColor)
      node.point = strategy.calculateHealthPoint(analytic).health - strategy.calculateStrategyPoint(analytic).sum / 2
      // console.log(`${node.color} ${node.point} ${node.move.toString()}`)
      // Render.print(new Match(node.boardEncode))
      return;
    }

    //Grow
    let analytic = new Analytic(new Match(node.boardEncode), node.color)
    let troops = analytic.getAllyTroops()

    for (let troop of troops) {
      let moves = Object.keys(troop.moves.getCapture())
      let randGoodFreeMove = strategy.randomGoodFreeMove(analytic, troop.pos)
      if (randGoodFreeMove.valid()) {
        moves.push(randGoodFreeMove.toPos)
      }

      let fromPos = troop.pos

      for (let toPos of moves) {
        let matchNext = new Match(node.boardEncode)
        matchNext.move(fromPos, toPos)
        
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