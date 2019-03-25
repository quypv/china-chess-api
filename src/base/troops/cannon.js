const c = require('../constants')
const Troop = require('./troop')

class Cannon extends Troop
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
    let upMoves = this.tryUp(x, y, board)
    let downMoves = this.tryDown(x, y, board)
    let leftMoves = this.tryLeft(x, y, board)
    let rightMoves = this.tryRight(x, y, board)

    this._openMoves = [].concat(upMoves, downMoves, leftMoves, rightMoves)
  }

  /**
   * Explore vertical down
   * @param {string} x 
   * @param {string} fromY 
   */
  tryDown(x, fromY, board) {
    let arrY = c.Y_AXIS.split(fromY)[1].split('')
    let arrPos = arrY.map((val) => { 
      return x + val
    })
    
    return this.try(arrPos, board)
  }

  /**
   * Explore vertical up
   * @param {string} x 
   * @param {string} fromY 
   */
  tryUp(x, fromY, board) {
    let arrY = c.Y_AXIS.split(fromY)[0].split('').reverse()
    let arrPos = arrY.map((val) => { 
      return x + val
    })
    
    return this.try(arrPos, board)
  }

  /**
   * Explore horizontal left
   * @param {string} fromX
   * @param {string} y 
   */
  tryLeft(fromX, y, board) {
    let arrX = c.X_AXIS.split(fromX)[0].split('').reverse()
    let arrPos = arrX.map((val) => { 
      return val + y
    })
    
    return this.try(arrPos, board)
  }

  /**
   * Explore horizontal right
   * @param {string} fromX
   * @param {string} y 
   */
  tryRight(fromX, y, board) {
    let arrX = c.X_AXIS.split(fromX)[1].split('')
    let arrPos = arrX.map((val) => { 
      return val + y
    })

    return this.try(arrPos, board)
  }

  /**
   * Check valid positions in list
   * @param {array} arrPos 
   */
  try(directionalArrPos, board) {
    let moves = []
    let fightMode = false

    for (let pos of directionalArrPos) {
      let troop = board.at(pos)

      if (!troop) {
        if (!fightMode) moves.push(pos)
        continue
      }

      if (!fightMode) {
        fightMode = true
        continue
      }

      if (this.isEnemy(troop)) {
        moves.push(pos)
        break
      }
    }

    return moves
  }
}

module.exports = Cannon