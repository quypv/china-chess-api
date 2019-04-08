const c = require('../base/constants')

class AnalyticPosition 
{
  constructor(troop) {
    this._canCapture = []
    this._threatenBy = []
    this._defendBy = []
    this._troop = troop
  }

  pushCapture(targetTroop) {
    this._canCapture.push(targetTroop)
  }

  pushThreat(attacker) {
    this._threatenBy.push(attacker)
  }

  pushDefender(allyTroop) {
    this._defendBy.push(allyTroop)
  }

  get captureList() {
    return this._canCapture
  }

  get threatList() {
    return this._threatenBy
  }

  get defendList() {
    return this._defendBy
  }

  get troop() {
    return this._troop
  }

}

module.exports = AnalyticPosition