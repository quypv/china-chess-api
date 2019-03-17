const c = require('../constants')
const p = require('../position')
const Troop = require('../troops/factory')

class Board 
{
  /**
   * Init blank board
   */
  init(troopsMap = null) {
    this._map = {}

    for (let x of c.X_AXIS) {
      for (let y of c.Y_AXIS) {
        this._map[x+y] = null
      }
    }

    this.setupDefault()

    if (troopsMap) {
      console.log('troopsMap keys size: ')
      console.log(Object.keys(troopsMap).length)
      this.loadSavedBoard(troopsMap)
    }
  }

  /**
   * Populate default troops map
   */
  setupDefault() {
    for (let pos in c.BLACK_TROOPS_MAP) {
      this.put(pos, Troop.fromCode(c.BLACK_TROOPS_MAP[pos]))
    }

    for (let pos in c.RED_TROOPS_MAP) {
      this.put(pos, Troop.fromCode(c.RED_TROOPS_MAP[pos]))
    }

    this.scanMoves()
  }

  /**
   * Clear board and start over again
   */
  reset() {
    this.init()
  }

  /**
   * Populate saved board
   */
  loadSavedBoard(troopsMap) {

  }

  /**
   * See what is at given position
   * @param {string} pos 
   */
  at (pos) {
    return p.validate(pos) ? this._map[pos] : null
  }

  /**
   * Take a troop away
   * @param {string} pos 
   */
  take (pos) {
    if (!p.validate(pos)) {
      return null
    }

    let troop = this._map[pos]
    this._map[pos] = null

    return troop
  }

  /**
   * Put a troop to position
   * @param {string} pos 
   * @param {Object} troop 
   */
  put (pos, troop) {
    if (p.validate(pos) && troop) {
      this._map[pos] = troop
      troop.setPosition(pos)
      return true
    }

    return false
  }

  /**
   * Scan troop available moves
   */
  scanMoves() {
    for (let troop of this.getOnBoardTroops()) {
      troop.calculateAvailableMoves(this)
    }
  }

  /**
   * Put a troop and re-scan moves
   * @param {string} pos 
   * @param {Object} troop 
   */
  forcePut (pos, troop) {
    this.put(pos, troop)
    this.scanMoves()
  }

  /**
   * @return {array}
   */
  getOnBoardTroops() {
    let arr = []

    for (let pos in this._map) {
      let troop = this.at(pos) 
      if (troop) arr.push(troop)
    }

    return arr
  }

  /**
   * Count number of troops left
   */
  countTroopOnBoard(color = null) {
    let count = 0
    for (let pos in this._map) {
      if (!p.validate(pos)) continue

      count += this._map[pos] 
        ? color && color !== this._map[pos].color
          ? 0
          : 1
        : 0
    }

    return count
  }

  /**
   * Move a troop
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  move (fromPos, toPos) {
    let troop = this.at(fromPos)

    if (!troop) return false
    if (!p.validate(toPos)) return false
    if (!troop.canMoveTo(toPos)) return false

    this.take(fromPos)
    this.put(toPos, troop)
    this.scanMoves()

    return true
  }

  /**
   * @return {array}
   */
  get map() {
    return this._map
  }
}

module.exports = Board
