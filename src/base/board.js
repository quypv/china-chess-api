const c = require('./constants')
const p = require('./position')
const Troop = require('./troops/factory')
const { ScanMovesFlow } = require('./flow')

class Board 
{
  /**
   * Init blank board
   */
  init(troopsMap = null) {
    this.setupDefault()

    if (troopsMap) {
      // console.log('troopsMap keys size: ')
      // console.log(Object.keys(troopsMap).length)
      this.loadSavedBoard(troopsMap)
    }
  }

  /**
   * Clear all troops
   */
  blank() {
    this._map = {}

    for (let x of c.X_AXIS) {
      for (let y of c.Y_AXIS) {
        this._map[x+y] = null
      }
    }
  }

  /**
   * Populate default troops map
   */
  setupDefault() {
    this.blank()

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
    this.blank()

    for (let pos in troopsMap) {
      this.put(pos, Troop.fromCode(troopsMap[pos]))
    }

    this.scanMoves()
  }

  /**
   * 
   * @param {string} state 
   */
  loadFromStrState(state) {
    return this.loadSavedBoard(this.decode(state))
  }

  /**
   * See what is at given position
   * @param {string} pos 
   */
  at (pos) {
    return p.validate(pos) ? this._map[pos] : null
  }

  /**
   * @param {string} troopCode 
   * @param {array} zone
   */
  find (troopCode, zone = []) {
    let posZone = zone.length ? zone : Object.keys(this._map)

    for (let pos of posZone) {
      if (!this._map[pos]) continue
      if (this._map[pos].code === troopCode) return this._map[pos]
    }

    return null
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
    if (ScanMovesFlow.isLocked()) return

    ScanMovesFlow.count()

    for (let troop of this.getOnBoardTroops()) {
      troop.calculateMoves(this)
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
   * @param {string} color 
   * @return {array}
   */
  getTroopsByColor(color = c.BLACK) {
    let arr = []

    for (let pos in this._map) {
      let troop = this.at(pos) 
      if (troop && troop.color === color) arr.push(troop)
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
    let targetTroop = this.at(toPos)

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

  /**
   * Encode & compress to data
   */
  encode() {
    let compressedMap = {}

    for (let troop of this.getOnBoardTroops()) {
      compressedMap[troop.pos] = troop.symbol
    }

    return JSON.stringify(compressedMap)
  }

  /**
   * Decode compressed data to loadable map
   * @param {string} compressedMap
   */
  decode(compressedMap) {
    let data = JSON.parse(compressedMap)
    let map = {}

    for (let pos in data) {
      map[pos] = c.SYMBOLS_REVERSE[data[pos]]
    }

    return map
  }

  /**
   * @return {boolean}
   */
  kingStand(color) {
    return !!this.find(
      color === c.BLACK ? c.BLACK_KING : c.RED_KING, 
      color === c.BLACK ? c.BLACK_KING_ZONE : c.RED_KING_ZONE
    )
  }
}

module.exports = Board
