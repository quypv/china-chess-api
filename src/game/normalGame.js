const c = require('./constants')
const Match = require('../base/match')
const Bot = require('../bot/bot')

class NormalGame
{
  constructor() {
    this._match = new Match()
    this._black = c.DEFAULT_HUMAN
    this._red = c.DEFAULT_HUMAN
  }

  /**
   * @return {Match}
   */
  get match() {
    return this._match
  }

  /**
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  move(fromPos, toPos) {
    if (this.isEnded()) return false

    let result = this._match.move(fromPos, toPos)
    if (this.isEnded()) this.endGame()

    return result
  }

  /**
   * @param {string} color
   * @param {string} botLevel 
   */
  getSuggesionMove(color, botLevel = c.EASY_GREEDY) {
    if (this.isEnded()) return false

    let bot = (new Bot()).factory(color, botLevel)
    return bot.pickMove(this._match)
  }

  /**
   * @return {boolean}
   */
  isEnded() {
    return this._match.isEnded()
  }

  /**
   * 
   */
  endGame() {
    throw 'Ended, winner is '+this._match.winner()
  }
}

module.exports = NormalGame