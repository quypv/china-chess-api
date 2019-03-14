const c = require('../constants')
const Troop = require('../troops/factory')

const BLACK_TROOPS_MAP = {
  A9: c.BLACK_ROOK, B9: c.BLACK_KNIGHT, C9: c.BLACK_BISHOP, D9: c.BLACK_GUARD, E9: c.BLACK_KING, F9: c.BLACK_GUARD, G9: c.BLACK_BISHOP, H9: c.BLACK_KNIGHT, I9: c.BLACK_ROOK,
  B7: c.BLACK_CANNON, H7: c.BLACK_CANNON,
  A6: c.BLACK_PAWN, C6: c.BLACK_PAWN, E6: c.BLACK_PAWN, G6: c.BLACK_PAWN, I6: c.BLACK_PAWN
}
const RED_TROOPS_MAP = {
  A0: c.RED_ROOK, B0: c.RED_KNIGHT, C0: c.RED_BISHOP, D0: c.RED_GUARD, E0: c.RED_KING, F0: c.RED_GUARD, G0: c.RED_BISHOP, H0: c.RED_KNIGHT, I0: c.RED_ROOK,
  B2: c.RED_CANNON, H2: c.RED_CANNON,
  A3: c.RED_PAWN, C3: c.RED_PAWN, E3: c.RED_PAWN, G3: c.RED_PAWN, I3: c.RED_PAWN
}

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
    for (let pos in BLACK_TROOPS_MAP) {
      this.put(pos, Troop.fromCode(BLACK_TROOPS_MAP[pos]))
    }

    for (let pos in RED_TROOPS_MAP) {
      this.put(pos, Troop.fromCode(RED_TROOPS_MAP[pos]))
    }
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
    return this.validPosition(pos) ? this._map[pos] : null
  }

  /**
   * Take a troop away
   * @param {string} pos 
   */
  take (pos) {
    if (!this.validPosition(pos)) {
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
    if (this.validPosition(pos) && troop) {
      this._map[pos] = troop
      return true
    }

    return false
  }

  /**
   * Count number of troops left
   */
  countTroopOnBoard(color = null) {
    let count = 0
    for (let pos in this._map) {
      if (!this.validPosition(pos)) continue

      count += this._map[pos] 
        ? color && color !== this._map[pos].color
          ? 0
          : 1
        : 0
    }

    return count
  }

  /**
   * Valid position: [A-I][0-9]
   */
  validPosition(pos) {
    if (pos.length !== 2) return false
    if (c.X_AXIS.indexOf(pos.charAt(0)) === -1) return false
    if (c.Y_AXIS.indexOf(pos.charAt(1)) === -1) return false

    return true
  }

  /**
   * Move a troop
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  move (fromPos, toPos) {
    let troop = this.at(fromPos)

    if (!troop) return false
    if (!troop.canMoveTo(toPos)) return false

    this.take(fromPos)
    this.put(toPos)

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