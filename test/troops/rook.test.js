const c = require('../../src/constants')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
const Rook = require('../../src/troops/rook')
var assert = require('assert')

describe('Rook movement', () => {
  let board = new Board()
  board.init()
  Render.print(board)

  it('can not move up if blocked', () => {
    board.reset()
    assert.equal(board.move('A9', 'A6'), false)
  })

  it('can not move outside board', () => {
    board.reset()
    assert.equal(board.move('A9', 'Z9'), false)
  })

  it('can move up', () => {
    board.reset()
    assert.equal(board.move('A9', 'A7'), true)
    Render.print(board)
  })

  it('can not move right if blocked', () => {
    board.reset()
    board.move('A9', 'A7')
    assert.equal(board.move('A7', 'B7'), false)
  })

  it('can move continuosly', () => {
    board.reset()
    board.move('A9', 'A7')
    assert.equal(board.move('A7', 'A8'), true)
    assert.equal(board.move('A8', 'D8'), true)
    assert.equal(board.move('D8', 'D2'), true)
    Render.print(board)
  })

  it('can take down enemy troop', () => {
    board.reset()
    board.move('A9', 'A8')
    board.move('A8', 'D8')
    board.move('D8', 'D2')
    assert.equal(board.move('D2', 'B2'), true)
    assert.equal(board.countTroopOnBoard(), 31)
    assert.equal(board.countTroopOnBoard(c.RED), 15)
    assert.equal(board.countTroopOnBoard(c.BLACK), 16)
    Render.print(board)
  })
})