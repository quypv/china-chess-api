const c = require('../base/constants')
const POINT = {}

POINT[c.KING]   = 100000
POINT[c.ROOK]   = 600
POINT[c.KNIGHT] = 300
POINT[c.CANNON] = 400
POINT[c.BISHOP] = 110
POINT[c.GUARD]  = 110
POINT[c.PAWN]   = 70

class StrategyPoint 
{
  constructor() {
    this._sum = 0
    this._detail = {}
    this._health = {
      ally: 0,
      enemy: 0
    }
  }

  get sum() { return this._sum }
  get detail() { return this._detail}

  /**
   * @param {string} code 
   * @return {int}
   */
  getPoint(code) {
    let type = code.match(/(?<=_)(.*)/g)[0]
    return POINT[type]
  }

  /**
   * 
   * @param {string} code 
   * @param {int} point 
   */
  pushAttack(troop, attackers, point) {
    if (typeof point === 'undefined') {
      point = this.getPoint(troop.code)
    }

    this._push(troop, attackers, point)
  }

  /**
   * 
   * @param {string} code 
   * @param {int} point 
   */
  pushThreat(troop, attackers, point) {
    if (typeof point === 'undefined') {
      point = -1 * this.getPoint(troop.code)
    }

    this._push(troop, attackers, point)
  }

  /**
   * @param {string} code 
   * @param {int} point 
   */
  _push(troop, attackers, point) {
    this._detail[troop.pos] = {
      troop,
      attackers,
      point
    }
    this._doSum()
  }

  /**
   * @return {void}
   */
  _doSum() {
    this._sum = 0

    for (let pos in this._detail) {
      this._sum += this._detail[pos].point
    }
  }

  addAllyHealth(troop) {
    this._health.ally += this.getPoint(troop.code)
  }

  addEnemyHealth(troop) {
    this._health.enemy += this.getPoint(troop.code)
  }

  get health() {
    return this._health.ally - this._health.enemy
  }

  print() {
    let str = ''

    for (let pos in this._detail) {
      str += this._detail[pos].troop.toString() + ':' + this._detail[pos].point + '   '
    }

    return str
  }

  maxInList(arrTroopCode) {
    let arrPoint = []
    for (let code of arrTroopCode) {
      arrPoint.push(this.getPoint(code))
    }

    return Math.max(arrPoint)
  }
}

module.exports = StrategyPoint