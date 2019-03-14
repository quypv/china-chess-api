const Hisotry = requrie('./history')
const Board = require('./board')

class Game 
{
  constructor() {
    this._board = new Board()
    this._history = new Hisotry()
  }

  start() {
    this._board.init()
  }

  putHistory() {
    this._history.save(this._board)
  }

  get board() {
    return this._board
  }

  get hisotry() {
    return this._history
  }

  queryHistory(size=1) {
    return this._history.queryBack(size)
  }
}

module.exports = Game