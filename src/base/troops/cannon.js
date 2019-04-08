const c = require('../constants')
const p = require('../position')
const Troop = require('./troop')
const Moves = require('./moves')

class Cannon extends Troop
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
    let x = this._pos.charAt(0)
    let y = this._pos.charAt(1)
    
    let unValidateMoves = {
      up: this.tryUp(x, y, board),
      down: this.tryDown(x, y, board),
      left: this.tryLeft(x, y, board),
      right: this.tryRight(x, y, board)
    }

    for (let direction in unValidateMoves) 
    {
      let fightMode = false
      for (let pos of unValidateMoves[direction]) 
      {
        let troop = board.at(pos)
  
        if (!troop) {
          if (!fightMode) moves.push(pos)
          continue
        }
  
        if (!fightMode) {
          fightMode = true
          continue
        }

        this.isEnemy(troop) 
          ? moves.pushCapture(pos, troop)
          : moves.pushGuard(pos, troop)

        break
      }
    }

    return moves
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
    
    return arrPos
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
    
    return arrPos
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
    
    return arrPos
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

    return arrPos
  }

  /**
   * Check valid positions in list
   * @param {array} arrPos 
   */
  // try(directionalArrPos, board) {
  //   let moves = []
  //   let fightMode = false

  //   for (let pos of directionalArrPos) {
  //     let troop = board.at(pos)

  //     if (!troop) {
  //       if (!fightMode) moves.push(pos)
  //       continue
  //     }

  //     if (!fightMode) {
  //       fightMode = true
  //       continue
  //     }

  //     if (this.isEnemy(troop)) {
  //       moves.push(pos)
  //       break
  //     }
  //   }

  //   return moves
  // }
}

module.exports = Cannon