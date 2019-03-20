const Hisotry = require('./history')
const Board = require('./board')

class Game 
{
  constructor() {
    this._board = new Board()
    this._history = new Hisotry()
    this.newGame()
  }

  newGame() {
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
    let success = this._board.move(fromPos, toPos)
    this.putHistory()

    return success
  }

  /**
   * @return 
   */
  undo() {
    let state = this._history.pop()
    state
      ? this._board.loadFromStrState(state)
      : this._board.setupDefault()
  }
}

module.exports = Game