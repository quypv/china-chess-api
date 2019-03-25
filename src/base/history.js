const Board = require('./board')

class History 
{
  constructor() {
    this._histories = []
  }

  queryBack(size=1) {
    return this._histories.slice(size, -1)
  }

  /**
   * 
   * @param {Board} board 
   */
  save(board) {
    this._histories.push(board.encode())
  }

  /**
   * @return {string}
   */
  pop() {
    if (this.isEmpty()) return null
    this._histories.splice(-1, 1)

    return this.last
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this._histories.length === 0
  }

  /**
   * @return {string}
   */
  get last() {
    return this.isEmpty() ? null : this._histories.slice(-1)
  }

  /**
   * @return {int}
   */
  count() {
    return this._histories.length
  }

}

module.exports = History