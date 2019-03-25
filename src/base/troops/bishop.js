const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')

class Bishop extends Troop
{
  constructor(code) {
    super(code)
  }

  /**
   * See what moves this troop can take
   * @param {Board} board 
   */
  calculateAvailableMoves(board) {
    if (!this._pos) {
      this._openMoves = []
      return false
    }

    let leftMoves = this.tryLeft(board)
    let rightMoves = this.tryRight(board)

    this._openMoves = [].concat(leftMoves, rightMoves)
  }

  /**
   * 
   * @param {string} x 
   * @param {string} y 
   * @param {Board} board 
   * @return {array}
   */
  tryLeft (board) {
    let arrPos = []
    let upPos       = p.upLeft(this._pos, 2, 2)
    let blockerUp   = p.upLeft(this._pos, 1, 1)
    let downPos     = p.downLeft(this._pos, 2, 2)
    let blockerDown = p.downLeft(this._pos, 1, 1)

    if (upPos && !board.at(blockerUp))     arrPos.push(upPos)
    if (downPos && !board.at(blockerDown)) arrPos.push(downPos)

    return this.try(arrPos, board)
  }

  /**
   * 
   * @param {string} x 
   * @param {string} y 
   * @param {Board} board 
   * @return {array}
   */
  tryRight (board) {
    let arrPos = []
    let upPos       = p.upRight(this._pos, 2, 2)
    let blockerUp   = p.upRight(this._pos, 1, 1)
    let downPos     = p.downRight(this._pos, 2, 2)
    let blockerDown = p.downRight(this._pos, 1, 1)

    if (upPos && !board.at(blockerUp))     arrPos.push(upPos)
    if (downPos && !board.at(blockerDown)) arrPos.push(downPos)

    return this.try(arrPos, board)
  }

  /**
   * 
   * @param {array} arrPos 
   * @param {Board} board 
   * @return {array}
   */
  try (arrPos, board) {
    let moves = []

    for (let pos of arrPos) {
      if (this.posCrossedRiver(pos)) continue
      if (this.allyAlreadyOnPos(pos, board)) continue

      moves.push(pos)
    }

    return moves
  }
}

module.exports = Bishop