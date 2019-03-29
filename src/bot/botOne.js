const c = require('../base/constants')
const Base = require('./base')
const Analytic = require('./analytic')
const Order = require('./order')
const Strategy = require('./strategy')

class BotOne extends Base
{
  /**
   * 
   * @param {Analytic} analytic 
   * @return {Order}
   */
  algorithm(analytic) {
    let strategy = new Strategy(analytic)

    return strategy.pickRandomMove(analytic)
  }
}

module.exports = BotOne