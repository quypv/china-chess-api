const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class Bishop extends Troop
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
    let unValidateMoves = [].concat(
      this.tryLeft(board),
      this.tryRight(board)
    );

    for (let pos of unValidateMoves) {
      if (this.posCrossedRiver(pos)) continue

      let troop = board.at(pos)
      if (troop) {
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

    return arrPos
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

    return arrPos
  }
}

module.exports = Bishop