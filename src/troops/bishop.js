const c = require('../constants')
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

    let x = this._pos.charAt(0)
    let y = this._pos.charAt(1)
    
    let leftMoves = this.tryLeft(x, y, board)
    let rightMoves = this.tryRight(x, y, board)

    this._openMoves = [].concat(leftMoves, rightMoves)
  }

  /**
   * 
   * @param {string} x 
   * @param {string} y 
   * @param {Board} board 
   * @return {array}
   */
  tryLeft (x, y, board) {
    let arrPos = []
    let leftX  = c.X_AXIS.indexOf(x) - 2
    let upY    = c.Y_AXIS.indexOf(y) - 2
    let downY  = c.Y_AXIS.indexOf(y) + 2

    if (leftX < 0) return arrPos
    let toX = c.X_AXIS.charAt(leftX)

    if (upY >= 0)                 arrPos.push(toX + c.Y_AXIS.charAt(upY))
    if (downY < c.Y_AXIS.length)  arrPos.push(toX + c.Y_AXIS.charAt(downY))

    return this.try(arrPos, board)
  }

  /**
   * 
   * @param {string} x 
   * @param {string} y 
   * @param {Board} board 
   * @return {array}
   */
  tryRight (x, y, board) {
    let arrPos = []
    let rightX = c.X_AXIS.indexOf(x) + 2
    let upY    = c.Y_AXIS.indexOf(y) - 2
    let downY  = c.Y_AXIS.indexOf(y) + 2

    if (rightX >= c.X_AXIS.length) return arrPos
    let toX = c.X_AXIS.charAt(rightX)

    if (upY >= 0)                 arrPos.push(toX + c.Y_AXIS.charAt(upY))
    if (downY < c.Y_AXIS.length)  arrPos.push(toX + c.Y_AXIS.charAt(downY))

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
      if (this.posCrossedRiver(pos, board)) continue
      if (this.allyAlreadyOnPos(pos, board)) continue
      if (this.anyTroopBlockPath(this._pos, pos, board)) continue

      moves.push(pos)
    }

    return moves
  }

  /**
   * @param {string} fromPos
   * @param {string} toPos
   * @return {boolean}
   */
  anyTroopBlockPath(fromPos, toPos, board) {
    let ix = c.X_AXIS.indexOf(fromPos.charAt(0))
    let iy = c.Y_AXIS.indexOf(fromPos.charAt(1))
    let iToX = c.X_AXIS.indexOf(toPos.charAt(0))
    let iToY = c.Y_AXIS.indexOf(toPos.charAt(1))

    if (ix === iToX || iy === iToY) return false

    let middleX = c.X_AXIS.charAt(ix > iToX ? ix-1 : ix+1)
    let middleY = c.Y_AXIS.charAt(iy > iToY ? iy-1 : iy+1)

    return !!board.at(middleX+middleY)
  }
}

module.exports = Bishop