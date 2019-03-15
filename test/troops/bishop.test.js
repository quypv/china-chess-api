const c = require('../../src/constants')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
var assert = require('assert')

describe('Bishop movement', () => {
  let board = new Board()
  board.init()
  
  it('can move diagonally', () => {
    board.reset()
    assert.equal(board.move('C0', 'A2'), true)
  })

  it('can move continuosly', () => {
    board.reset()
    board.move('C0', 'A2')
    assert.equal(board.move('A2', 'C4'), true)
  })

  it('can take down enemy', () => {
    board.reset()
    board.forcePut('E2', board.take('A9'))
    assert.equal(board.move('C0', 'E2'), true)
    assert.equal(board.countTroopOnBoard(), 31)
    assert.equal(board.countTroopOnBoard(c.RED), 16)
    assert.equal(board.countTroopOnBoard(c.BLACK), 15)
  })

  it('cannot move horizontally', () => {
    board.reset()
    board.forcePut('C4', board.take('C0'))
    assert.equal(board.move('C4', 'D4'), false)
  })

  it('cannot cross the river', () => {
    board.reset()
    board.forcePut('C4', board.take('C0'))
    assert.equal(board.move('C4', 'E6'), false)
  })

  it('cannot move if diagonal path is blocked', () => {
    board.reset()
    board.forcePut('D2', board.take('C0'))
    assert.equal(board.move('D2', 'F4'), false)
  })

})
