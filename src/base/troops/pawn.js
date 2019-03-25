const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')

class Pawn extends Troop
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

    let forward = this.tryForward(board)
    let horizontal = this.trySideMoves(board)

    this._openMoves = [].concat(forward, horizontal)
  }

  /**
   * @param {Board} board 
   */
  tryForward(board) {
    let arrPos = []
    let fwdPos = this.isBlack() ? p.up(this._pos) : p.down(this._pos)
    if (fwdPos) arrPos.push(fwdPos)

    return this.try(arrPos, board)
  }

  /**
   * 
   * @param {Board} board 
   */
  trySideMoves(board) {
    let arrPos = []

    if (this.posCrossedRiver(this._pos)) {
      let leftPos = p.left(this._pos)
      let rightPos = p.right(this._pos)

      if (leftPos) arrPos.push(leftPos)
      if (rightPos) arrPos.push(rightPos)
    }

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
      if (this.allyAlreadyOnPos(pos, board)) continue

      moves.push(pos)
    }

    return moves
  }
}

module.exports = Pawn