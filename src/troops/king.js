const p = require('../position')
const Troop = require('./troop')

class King extends Troop
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
      p.up(this._pos),
      p.down(this._pos),
      p.left(this._pos),
      p.right(this._pos)
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

module.exports = King