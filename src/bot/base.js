const c = require('../base/constants')
const Analytic = require('./analytic')

class BotBase
{
  constructor(myColor) {
    this._color = myColor
    this._enemyColor = myColor === c.BLACK ? c.RED : c.BLACK
  }

  /**
   * 
   * @param {Match} match 
   * @param {string} myColor 
   * @return {object|null}
   */
  pickMove(match) {
    let analytic = new Analytic(match, this._color)
    return this.algorithm(analytic)
  }

  /**
   * 
   * @param {Match} match 
   * @param {Analytic} analytic 
   * @return {null|object}
   */
  algorithm(analytic) { }
}

module.exports = BotBase