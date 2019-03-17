const p = require('../position')
const Troop = require('./troop')

class Guard extends Troop
{
  constructor(code) {
    super(code)
  }

  /**
   * See what moves this troop can take
   * @param {Board} board 
   */
  calculateAvailableMoves(board) {
    this._openMoves = []

    if (!this._pos) {
      return false
    }

    let arrPos = [
      p.upLeft(this._pos, 1, 1),
      p.upRight(this._pos, 1, 1),
      p.downLeft(this._pos, 1, 1),
      p.downRight(this._pos, 1, 1)
    ]

    for (let pos of arrPos) {
      if (!pos) continue
      if (!p.validate(pos)) continue
      if (!p.inKingZone(pos, this._color)) continue
      if (this.allyAlreadyOnPos(pos, board)) continue

      this._openMoves.push(pos)
    }
  }
}

module.exports = Guard