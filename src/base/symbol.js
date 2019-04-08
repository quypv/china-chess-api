const Troop = require('./troops/troop')
const c = require('./constants')

class Symbol
{
  constructor(code, pos) {
    this._encode = `${c.SYMBOLS[code]}|${pos}`
  }

  toString() {
    return this._encode
  }

  get char() { return this._encode.split('|')[0] }
  get pos()  { return this._encode.split('|')[1] }
  get code() { return c.SYMBOLS_REVERSE[this.char] }

  /**
   * @param {Troop} board 
   */
  getTroop(board) {
    return board.at(this.pos)
  }
}

module.exports = Symbol