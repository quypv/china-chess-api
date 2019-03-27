const c = require('../base/constants')

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
      let list = this._match.board.getTroopsByColor(this._color)
      this._put(key, list)
    }

    return this._read(key)
  }

  /**
   * @return {array}
   */
  getEnemyTroops() {
    let key = 'enemyTroops'

    if (!this._has(key)) { 
      let list = this._match.board.getTroopsByColor(this._enemyColor)
      this._put(list)
    }

    return this._read(key)
  }

  /**
   * @param {string} color 
   * @return {array}
   */
  _getMoves(troops) {
    let moves = []

    for (let troop of troops) {
      for (let pos of troop.moves) {
        Array.isArray(moves[pos])
          ? moves[pos].push(troop.code)
          : moves[pos] = [troop.code]
      }
    }

    return moves
  }

  /**
   * @return {array}
   */
  getAllyMoves() {
    let key = 'allyMoves'

    if (!this._has(key)) {
      let arr = this._getMoves(this.getAllyTroops())
      this._put(key, arr)
    }

    return this._read(key)
  }

  /**
   * @return {array}
   */
  getEnemyMoves() {
    let key = 'enemyMoves'

    if (!this._has(key)) {
      let arr = this._getMoves(this.getEnemyTroops())
      this._put(key, arr)
    }

    return this._read(key)
  }

  /**
   * @param {array} troops 
   * @return {object}
   */
  _getPosList(troops) {
    let map = {}

    for (let troop of troops) {
      map[troop.code] = troop.pos
    }

    return map
  }

  /**
   * @return {object}
   */
  getAllyPosList() {
    let key = 'allyPos'

    if (!this._has(key)) {
      let arr = this._getPosList(this.getAllyTroops())
      this._put(key, arr)
    }

    return this._read(key)
  }

  /**
   * @return {object}
   */
  getEnemyPosList() {
    let key = 'enemyPos'

    if (!this._has(key)) {
      let arr = this._getPosList(this.getEnemyTroops())
      this._put(key, arr)
    }

    return this._read(key)
  }

  /**
   * @param {object} posMap 
   * @param {object} enemyMoves 
   */
  _getThreatenList(posMap, enemyMoves) {
    let map = {}

    for (let code in posMap) {
      let threat = enemyMoves[posMap[code]]
      if (threat) {
        map[code] = threat
      }
    }

    return map
  }

  /**
   * @return {null|array}
   */
  allyThreatenList() {
    let key = 'allyThreatenList'

    if (!this._has(key)) {
      let map = this._getThreatenList(this.getAllyPosList(), this.getEnemyMoves())
      this._put(key, map)
    }

    return this._read(key)
  }

  /**
   * @return {null|array}
   */
  enemyThreatenList() {
    let key = 'enemyThreatenList'

    if (!this._has(key)) {
      let map = this._getThreatenList(this.getEnemyPosList(), this.getAllyMoves())
      this._put(key, map)
    }

    return this._read(key)
  }

  /**
   * @param {string} code
   */
  anAllyThreatenBy(code) {
    let threat = this.allyThreatenList()[code]

    return threat ? threat : null
  }

}

module.exports = Analytic
