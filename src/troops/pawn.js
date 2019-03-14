const Troop = require('./troop')

class Pawn extends Troop
{
  constructor(code) {
    super(code)
  }
}

module.exports = Pawn