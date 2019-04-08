const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class Knight extends Troop
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
      this.tryUp(board),
      this.tryDown(board),
      this.tryLeft(board),
      this.tryRight(board)
    )
    
    for (let pos of unValidatePosList) {
      let troop = board.at(pos)
      if(troop) {
        this.isEnemy(troop)
          ? moves.pushCapture(pos, troop)
          : moves.pushGuard(pos, troop)
        continue
      }

      moves.push(pos)
    }

    return moves
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

    return arrPos
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

    return arrPos
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

    return arrPos
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

    return arrPos
  }
}

module.exports = Knight