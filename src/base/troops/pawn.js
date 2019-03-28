const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class Pawn extends Troop
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
      this.tryForward(board),
      this.trySideMoves(board)
    )

    for (let pos of unValidatePosList) {
      let troop = board.at(pos)
      if(troop) {
        this.isEnemy(troop)
          ? moves.pushCapture(pos, troop.code)
          : moves.pushGuard(pos, troop.code)
        continue
      }

      moves.push(pos)
    }

    return moves
  }

  /**
   * @param {Board} board 
   */
  tryForward(board) {
    let arrPos = []
    let fwdPos = this.isBlack() ? p.up(this._pos) : p.down(this._pos)
    if (fwdPos) arrPos.push(fwdPos)

    return arrPos
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

    return arrPos
  }
}

module.exports = Pawn