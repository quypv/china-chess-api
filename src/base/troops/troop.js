const c = require('../constants')
const p = require('../position')

class Troop 
{
  constructor(code) {
    this._code = code
    this._color = this.isBlack() ? c.BLACK : c.RED
    this._symbol = c.SYMBOLS[code]
    this._pos = null
    this._openMoves = []
  }

  /**
   * @return {boolean}
   */
  isBlack() {
    return this._code.startsWith(c.BLACK)
  }

  /**
   * @return {boolean}
   */
  isRed() {
    return this._code.startsWith(c.RED)
  }

  /**
   * @return {string}
   */
  get color() {
    return this._color
  }

  /**
   * @return {string}
   */
  get enemyColor() {
    return this.isBlack() ? c.RED : c.BLACK
  }

  /**
   * Black troop: lower case char
   * Red troop: uppser case char
   * @return {string}
   */
  get symbol() {
    return this._symbol
  }

  /**
   * @return {string}
   */
  get pos() {
    return this._pos
  }

  /**
   * @return {string}
   */
  get code() {
    return this._code
  }

  /**
   * @return {array}
   */
  get moves() {
    return this._openMoves
  }

  /**
   * @param {string} pos
   */
  setPosition(pos) {
    this._pos = pos
  }

  /**
   * Calculate all available moves for current position
   */
  calculateAvailableMoves(board) { }

  /**
   * @return {boolean}
   */
  canMoveTo(toPos) {
    return this._openMoves.indexOf(toPos) !== -1
  }

  /**
   * Is enemy troop
   * @param {Troop} otherTroop 
   */
  isEnemy(otherTroop) {
    return otherTroop.color !== this._color
  }

  /**
   * Is enemy troop
   * @param {Troop} otherTroop 
   */
  isAlly(otherTroop) {
    return !this.isEnemy(otherTroop)
  }

  /**
   * @return {string}
   */
  getRiverY() {
    return p.getRiverBorderY(this._color)
  }

  /**
   * @return {string}
   */
  getEnemyRiverY() {
    return p.getRiverBorderY(this.enemyColor)
  }

  /**
   * 
   * @param {string} pos 
   */
  posCrossedRiver(pos) {
    let iy = c.Y_AXIS.indexOf(pos.charAt(1))
    let iEnemyRiver = c.Y_AXIS.indexOf(this.getEnemyRiverY())
    
    return this.isBlack() 
      ? iy <= iEnemyRiver
      : iy >= iEnemyRiver
  }

  /**
   * 
   * @param {string} pos 
   * @param {Board} board 
   */
  allyAlreadyOnPos(pos, board) {
    let troop = board.at(pos)
    return !!troop && this.isAlly(troop)
  }

  /**
   * @return {boolean}
   */
  isKing() {
    return this._code.indexOf(c.KING) !== -1
  }
}

module.exports = Troop