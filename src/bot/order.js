class Order 
{
  /**
   * @param {string} fromPos 
   * @param {string} toPos 
   */
  constructor(fromPos = null, toPos = null)
  {
    this._fromPos = fromPos
    this._toPos = toPos
  }

  get fromPos() {
    return this._fromPos
  }

  get toPos() {
    return this._toPos
  }

  valid() {
    return this._fromPos && this._toPos
  }

}

module.exports = Order