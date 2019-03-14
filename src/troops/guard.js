const Troop = require('./troop')

class Guard extends Troop
{
  constructor(code) {
    super(code)
  }
}

module.exports = Guard