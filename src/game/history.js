
class History 
{
  constructor() {
    this._histories = []
  }

  queryBack(size=1) {
    return this._histories.slice(size, -1)
  }

  save(board) {
    this._histories.push(board)
  }

}

module.exports = History