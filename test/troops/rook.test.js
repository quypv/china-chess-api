const c = require('../../src/constants')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
const Rook = require('../../src/troops/rook')
var assert = require('assert')

describe('New board', () => {
  it('should have 32 troops on board', () => {
    assert.equal(board.countTroopOnBoard(), 32)
  })
})