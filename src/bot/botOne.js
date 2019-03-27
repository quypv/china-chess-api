const c = require('../base/constants')
const Base = require('./base')
const Analytic = require('./analytic')

class BotOne extends Base
{
  /**
   * 
   * @param {Analytic} analytic 
   * @return {null|object}
   */
  algorithm(analytic) {
    

    return this.pickRandomMove(analytic)
  }

  /**
   * @param {Analytic} analytic 
   */
  pickRandomMove(analytic) {
    let troops = analytic.getAllyTroops()

    let tried = 0
    let troop

    do {
      let randTroop = troops[Math.floor(Math.random() * troops.length)]
      if (randTroop.moves.length) {
        troop = randTroop
        break
      }
      tried++
    }
    while(tried <= troops.length)

    if (!troop) return null

    let toPos = troop.moves[Math.floor(Math.random() * troop.moves.length)];

    return {
      fromPos: troop.pos,
      toPos: toPos
    }
  }


}

module.exports = BotOne