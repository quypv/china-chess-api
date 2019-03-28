class Moves 
{
  constructor() {
    this._active = []
    this._guard = {}
    this._capture = {}
    this._defend = {}
  }

  getActive()  { return this._active }
  getGuard()   { return this._guard }
  getCapture() { return this._capture }

  push(pos) {
    this._active.push(pos)
  }

  pushGuard(pos, allyCode) {
    this._guard[pos] = allyCode
  }

  pushCapture(pos, enemyCode) {
    this._capture[pos] = enemyCode
    this.push(pos)
  }

}

module.exports = Moves