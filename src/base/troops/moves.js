class Moves 
{
  constructor() {
    this._active = []
    this._guard = {}
    this._capture = {}
    this._defend = {}
    this._free = []
  }

  getActive()  { return this._active }
  getGuard()   { return this._guard }
  getCapture() { return this._capture }
  getFree()    { return this._free }

  hasActive()  { return this._active.length }
  hasCapture() { return Object.keys(this._capture).length }
  hasGuard()   { return Object.keys(this._guard).length }

  push(pos) {
    this._active.push(pos)
    this._free.push(pos)
  }

  pushGuard(pos, allyTroop) {
    this._guard[pos] = allyTroop
  }

  pushCapture(pos, targetTroop) {
    this._capture[pos] = targetTroop
    this._active.push(pos)
  }

}

module.exports = Moves