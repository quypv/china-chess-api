const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')

class Knight extends Troop
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

    let upMoves = this.tryUp(board)
    let downMoves = this.tryDown(board)
    let leftMoves = this.tryLeft(board)
    let rightMoves = this.tryRight(board)

    this._openMoves = [].concat(upMoves, downMoves, leftMoves, rightMoves)
  }

  /**
   * @param {Board} board 
   * @return {array}
   */
  tryUp (board) {
    let upPosL, upPosR
    let blocker = p.up(this._pos)

    if (blocker && !!board.at(blocker)) {
      return []
    }

    let arrPos = []
    if (upPosL = p.upLeft(this._pos, 2, 1))  arrPos.push(upPosL)
    if (upPosR = p.upRight(this._pos, 2, 1)) arrPos.push(upPosR)

    return this.try(arrPos, board)
  }

  /**
   * @param {Board} board 
   * @return {array}
   */
  tryDown (board) {
    let downPosL, downPosR
    let blocker = p.down(this._pos)

    if (blocker && !!board.at(blocker)) {
      return []
    }

    let arrPos = []
    if (downPosL = p.downLeft(this._pos, 2, 1))  arrPos.push(downPosL)
    if (downPosR = p.downRight(this._pos, 2, 1)) arrPos.push(downPosR)

    return this.try(arrPos, board)
  }

  /**
   * @param {Board} board 
   * @return {array}
   */
  tryLeft (board) {
    let leftPosL, leftPosR
    let blocker = p.left(this._pos)

    if (blocker && !!board.at(blocker)) {
      return []
    }

    let arrPos = []
    if (leftPosL = p.upLeft(this._pos, 1, 2))   arrPos.push(leftPosL)
    if (leftPosR = p.downLeft(this._pos, 1, 2)) arrPos.push(leftPosR)

    return this.try(arrPos, board)
  }

  /**
   * @param {Board} board 
   * @return {array}
   */
  tryRight (board) {
    let rightPosL, rightPosR
    let blocker = p.right(this._pos)

    if (blocker && !!board.at(blocker)) {
      return []
    }

    let arrPos = []
    if (rightPosL = p.upRight(this._pos, 1, 2))   arrPos.push(rightPosL)
    if (rightPosR = p.downRight(this._pos, 1, 2)) arrPos.push(rightPosR)

    return this.try(arrPos, board)
  }

  /**
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

module.exports = Knight