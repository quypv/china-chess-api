const c = require('../base/constants')
const Analytic = require('./analytic')
const Order = require('./order')

class Strategy 
{
  /**
   * @param {Analytic} analytic 
   */
  constructor(analytic)
  {
    this._analytic = analytic
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
      if (randTroop.moves.length) {
        troop = randTroop
        break
      }
      tried++
    }
    while(tried <= troops.length)

    if (!troop) return new Order(null)

    let toPos = troop.moves[Math.floor(Math.random() * troop.moves.length)]

    return new Order(troop.pos, toPos)
  }
}

module.exports = Strategy