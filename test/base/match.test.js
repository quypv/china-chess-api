const Match = require('../../src/base/match')
const Board = require('../../src/base/board')
const Render = require('../../src/base/render')
var assert = require('assert')

describe('Match', () => {

  it('could create new match', () => {
    var match = new Match()
    var board = match.board

    assert.equal(board instanceof Board, true)
  })

  it('could move troop', () => {
    var match = new Match()

    assert.equal(match.move('A9', 'A8'), true)
    assert.equal(match.move('B7', 'B3'), true)
    assert.equal(match.move('B2', 'B9'), true)
  })

  it('could save history', () => {
    var match = new Match()
    match.move('A9', 'A8')
    assert.equal(match.history.count(), 1)
    match.move('A8', 'I8')
    assert.equal(match.history.count(), 2)
  })

  it('could undo a move', () => {
    var match = new Match()

    match.move('B7', 'B5')
    match.move('B5', 'D5')
    assert.equal(match.board.at('B7'), null)
    assert.equal(match.board.at('B5'), null)
    assert.notEqual(match.board.at('D5'), null)

    match.undo()
    assert.equal(match.board.at('D5'), null)
    assert.notEqual(match.board.at('B5'), null)

    match.undo()
    assert.equal(match.board.at('D5'), null)
    assert.equal(match.board.at('B5'), null)
    assert.notEqual(match.board.at('B7'), null)
  })

})