const c = require('../base/constants')
const Analytic = require('./analytic')
const Match = require('../base/match')
const Order = require('./order')
const StrategyPoint = require('./strategyPoint')
const AlphaBetaPruner = require('./algorithm/AlphaBetaPrune')
const TreeNode = require('./algorithm/TreeNode')

const EARLY_STAGE_TROOP_MAX = 14

class Strategy 
{
  /**
   * @param {Analytic} analytic 
   * @return {StrategyPoint}
   */
  calculateStrategyPoint(analytic) {
    let threatenList = analytic.getThreatenList()
    let captureList  = analytic.getCaptureList()
    let point = new StrategyPoint()

    for (let pos in threatenList) {
      point.pushThreat(
        threatenList[pos].troop,
        threatenList[pos].attackers
      )
    }

    for (let pos in captureList) {
      point.pushAttack(
        captureList[pos].troop,
        captureList[pos].attackers
      )
    }

    return point
  }

  /**
   * @param {Analytic} analytic 
   * @return {StrategyPoint}
   */
  calculateHealthPoint(analytic) {
    let allies = analytic.getAllyTroops()
    let enemies = analytic.getEnemyTroops()
    let point = new StrategyPoint()

    for (let ally of allies) {
      point.addAllyHealth(ally)
    }

    for (let enemy of enemies) {
      point.addEnemyHealth(enemy)
    }

    return point
  }

  /**
   * @param {Analytic} analytic
   * @return {boolean}
   */
  isInEarlyStage(analytic) {
    let minTroopsCount = Math.min(analytic.getAllyTroops().length, analytic.getEnemyTroops().length )
    return minTroopsCount <= EARLY_STAGE_TROOP_MAX
  }

  /**
   * @param {Analytic} analytic 
   * @return {Order}
   */
  pickRandomMove(analytic) {
    let troops = analytic.getAllyTroops()

    let tried = 0
    let troop

    do {
      let randTroop = troops[Math.floor(Math.random() * troops.length)]
      if (randTroop.moves.hasActive()) {
        troop = randTroop
        break
      }
      tried++
    }
    while(tried <= troops.length)

    if (!troop) return new Order(null)

    let moves = troop.moves.getActive()
    let toPos = moves[Math.floor(Math.random() * moves.length)]

    return new Order(troop.pos, toPos)
  }

  /**
   * @param {Analytic} analytic 
   * @param {string} fromPos 
   * @return {Order}
   */
  randomGoodFreeMove(analytic, fromPos) {
    let board = analytic.match.board
    let troop = board.at(fromPos)

    let bestPoint = -Infinity
    let toPos = null

    for (let pos of troop.moves.getFree()) {
      let simulateMatch = new Match(board.encode())
      simulateMatch.move(fromPos, pos)
      let point = this.calculateStrategyPoint(new Analytic(simulateMatch, analytic.color)).sum

      if (point >= bestPoint) {
        bestPoint = point
        toPos = pos
      }
    }

    return toPos ? new Order(fromPos, toPos, troop.symbol) : new Order()
  }

  /**
   * @param {TreeNode} tree
   * @return {Order}
   */
  alphaBetaPruner(tree) {
    let computer = new AlphaBetaPruner(tree)

    return computer.findBestMove()
  }
}

module.exports = Strategy