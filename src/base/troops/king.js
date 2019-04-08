const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class King extends Troop
{
  constructor(code) {
    super(code)
  }

  /**
   * See what moves this troop can take
   * @param {Board} board 
   */
  simulateMoves(board) {
    let moves = new Moves()
    let unValidatePosList = [].concat(
      p.up(this._pos),
      p.down(this._pos),
      p.left(this._pos),
      p.right(this._pos)
    )

    for (let pos of unValidatePosList) {
      if (!pos) continue
      if (!p.validate(pos)) continue
      if (!p.inKingZone(pos, this._color)) continue
      
      let troop = board.at(pos)
      if (troop) {
        this.isEnemy(troop)
          ? moves.pushCapture(pos, troop)
          : moves.pushGuard(pos, troop)
        continue
      }

      moves.push(pos)
    }

    return moves
  }
}

module.exports = King