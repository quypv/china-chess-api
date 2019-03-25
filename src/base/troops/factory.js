const c = require('../constants')
const Rook = require('./rook')
const Pawn = require('./pawn')
const King = require('./king')
const Guard = require('./guard')
const Bishop = require('./bishop')
const Knight = require('./knight')
const Cannon = require('./cannon')

const fromCode = (code) => {
  switch(code) {
    case c.BLACK_ROOK:
    case c.RED_ROOK:
      return new Rook(code)
    case c.BLACK_PAWN:
    case c.RED_PAWN:
      return new Pawn(code)
    case c.BLACK_KNIGHT:
    case c.RED_KNIGHT:
      return new Knight(code)
    case c.BLACK_BISHOP:
    case c.RED_BISHOP:
      return new Bishop(code)
    case c.BLACK_KING:
    case c.RED_KING:
      return new King(code)
    case c.BLACK_GUARD:
    case c.RED_GUARD:
      return new Guard(code)
    case c.BLACK_CANNON:
    case c.RED_CANNON:
      return new Cannon(code)
  }
}

module.exports = {
  fromCode,
}