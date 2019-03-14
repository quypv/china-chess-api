const c = require('../constants')

class Troop 
{
  constructor(code) {
    this._code = code
    this._color = this.isBlack() ? c.BLACK : c.RED
    this._symbol = this.isBlack() 
      ? code.match(/(?<=_)./g)[0].toLowerCase()
      : code.match(/(?<=_)./g)[0].toUpperCase()
  }

  /**
   * @return {boolean}
   */
  isBlack() {
    return this._code.startsWith(c.BLACK)
  }

  /**
   * @return {boolean}
   */
  isRed() {
    return this._code.startsWith(c.RED)
  }

  /**
   * @return {string}
   */
  get color() {
    return this._color
  }

  /**
   * Black troop: lower case char
   * Red troop: uppser case char
   * @return {string}
   */
  get symbol() {
    return this._symbol
  }

  /**
   * @return {boolean}
   */
  canMoveTo() {

  }
}

module.exports = Troop