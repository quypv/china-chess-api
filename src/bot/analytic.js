const c = require('../base/constants')
const AnalyticPosition = require('./analyticPosition')

class Analytic 
{
  constructor(match, color) {
    this._match = match
    this._color = color
    this._enemyColor = color === c.BLACK ? c.RED : c.BLACK
    this._data = {}
  }

  /**
   * @return {Match}
   */
  get match() {
    return this._match
  }
  /**
   * @return {string}
   */
  get color() {
    return this._color
  }

  /**
   * @param {string} key
   */
  _read(key) {
    return typeof this._data[key] !== 'undefined' 
      ? this._data[key]
      : null
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  _put(key, value) {
    this._data[key] = value
  }

  /**
   * @param {string} key
   */
  _has(key) {
    return typeof this._data[key] !== 'undefined'
  }

  /**
   * @param {string} code 
   */
  _code(code) {
    return this._color+'_'+code
  }

  /**
   * @param {string} code 
   */
  _enemyCode(code) {
    return this._enemyColor+'_'+code
  }

  /**
   * @return {array}
   */
  getAllyTroops() {
    let key = 'allyTroops'

    if (!this._has(key)) {
      this._put(key, this._match.board.getTroopsByColor(this._color))
    }

    return this._read(key)
  }

  /**
   * @return {array}
   */
  getEnemyTroops() {
    let key = 'enemyTroops'

    if (!this._has(key)) { 
      this._put(key, this._match.board.getTroopsByColor(this._enemyColor))
    }

    return this._read(key)
  }

  /**
   * @param {object} posMap 
   * @param {object} enemyMoves
   */
  _getCapturableList(troops) {
    let map = {}

    for(let troop of troops) 
    {
      if (troop.moves.hasCapture()) {
        let captureMoves = troop.moves.getCapture()

        for (let pos in captureMoves) 
        {
          Array.isArray(map[pos])
            ? map[pos].attackers.push(troop)
            : map[pos] = {
              troop: captureMoves[pos],
              attackers: [troop]
            }
        }
      }
    }

    return map
  }

  /**
   * @return {null|array}
   */
  getThreatenList() {
    let key = 'allyThreatenList'

    if (!this._has(key)) {
      let map = this._getCapturableList(this.getEnemyTroops())
      this._put(key, map)
    }

    return this._read(key)
  }

  /**
   * @return {null|array}
   */
  getCaptureList() {
    let key = 'allyCaptureList'

    if (!this._has(key)) {
      let map = this._getCapturableList(this.getAllyTroops())
      this._put(key, map)
    }

    return this._read(key)
  }

  /**
   * @param {string} code
   */
  // anAllyThreatenBy(code) {
  //   let threat = this.getAllyThreatenList()[code]

  //   return threat ? threat : null
  // }

}

module.exports = Analytic
