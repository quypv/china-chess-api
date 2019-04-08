const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class Guard extends Troop
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
      p.upLeft(this._pos, 1, 1),
      p.upRight(this._pos, 1, 1),
      p.downLeft(this._pos, 1, 1),
      p.downRight(this._pos, 1, 1)
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

module.exports = Guard