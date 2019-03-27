const c = require('./constants')
const Hisotry = require('./history')
const Board = require('./board')

const ENDED_FALSE = 0
const ENDED_TRUE = 1
const DEFAULT_RESULT = {
  winner: null,
  ended: ENDED_FALSE,
}

class Match 
{
  constructor() {
    this._board = new Board()
    this._history = new Hisotry()
    this._result = DEFAULT_RESULT
    this.newMatch()
  }

  newMatch() {
    this._board.init()
  }

  putHistory() {
    this._history.save(this._board)
  }

  get board() {
    return this._board
  }

  get history() {
    return this._history
  }

  queryHistory(size=1) {
    return this._history.queryBack(size)
  }

  /**
   * Move a troop
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  move(fromPos, toPos) {
    if (this.isEnded()) return false

    let result = this._board.move(fromPos, toPos)
    let success = !!result

    if (result) {
      this.putHistory()
    }

    let loserColor
    if (loserColor = this.checkKingDown()) {
      this.endMatch(loserColor)
    }

    return success
  }

  /**
   * @return 
   */
  undo() {
    if (this.isEnded()) return false

    let state = this._history.pop()
    state
      ? this._board.loadFromStrState(state)
      : this._board.setupDefault()
  }

  /**
   * @param 
   */
  checkKingDown() {
    if (!this._board.kingStand(c.BLACK)) {
      return c.BLACK
    }
    if (!this._board.kingStand(c.RED)) {
      return c.RED
    }

    return false
  }

  /**
   * @param {string} loserColor 
   */
  endMatch(loserColor) {
    this._result.winner = loserColor === c.BLACK ? c.RED : c.BLACK
    this._result.ended = ENDED_TRUE
    Object.freeze(this._history)
    Object.freeze(this._board)
  }

  /**
   * @return {boolean}
   */
  isEnded() {
    return this._result.ended === ENDED_TRUE
  }

  /**
   * @return {string}
   */
  winner() {
    return this._result.winner  
  }
}

module.exports = Match