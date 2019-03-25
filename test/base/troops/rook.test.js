const c = require('../../../src/base/constants')
const Board = require('../../../src/base/board')
const Render = require('../../../src/base/render')
var assert = require('assert')

describe('Rook movement', () => {
  let board = new Board()
  board.init()

  it('can move up', () => {
    board.reset()
    assert.equal(board.move('A9', 'A7'), true)
    //Render.print(board)
  })

  it('can move continuosly', () => {
    board.reset()
    board.move('A9', 'A7')
    assert.equal(board.move('A7', 'A8'), true)
    assert.equal(board.move('A8', 'D8'), true)
    assert.equal(board.move('D8', 'D2'), true)
    //Render.print(board)
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
    //Render.print(board)
  })

  it('cannot move right if blocked', () => {
    board.reset()
    board.move('A9', 'A7')
    assert.equal(board.move('A7', 'B7'), false)
  })

  it('cannot move up if blocked', () => {
    board.reset()
    assert.equal(board.move('A9', 'A6'), false)
  })

  it('cannot move outside board', () => {
    board.reset()
    assert.equal(board.move('A9', 'Z9'), false)
  })
})