class Order 
{
  /**
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  constructor(fromPos = null, toPos = null, symbol = null)
  {
    this._fromPos = fromPos
    this._toPos = toPos
    this._symbol = symbol
  }

  toString() {
    return `${this._symbol}: ${this._fromPos} -> ${this._toPos}`
  }

  get fromPos() {
    return this._fromPos
  }

  get toPos() {
    return this._toPos
  }

  get symbol() {
    return this._symbol
  }

  valid() {
    return this._fromPos && this._toPos
  }

}

module.exports = Order