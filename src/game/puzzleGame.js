const NormalGame = require('./normalGame')

class PuzzleGame extends NormalGame
{
  constructor(puzzleMap = {}) {
    super()
    this._match._board.loadFromStrState(puzzleMap)
  }
}

module.exports = PuzzleGame