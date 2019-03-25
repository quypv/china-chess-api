const Board = require('../../../src/base/board')
const Render = require('../../../src/base/render')
var assert = require('assert')

describe('Guard movement', () => {
  let board = new Board()
  board.init()
  
  it('can move diagonally in king zone & one step only', () => {
    board.reset()
    assert.equal(board.move('D0', 'F2'), false)
    assert.equal(board.move('D0', 'D1'), false)

    assert.equal(board.move('D0', 'E1'), true)
    assert.equal(board.move('E1', 'D2'), true)
    assert.equal(board.move('F0', 'E1'), true)

    assert.equal(board.move('F9', 'E8'), true)
    assert.equal(board.move('E8', 'D7'), true)
    assert.equal(board.move('D9', 'E8'), true)
  })

  it('can take down enemy', () => { 
    board.reset()
    assert.equal(board.move('D0', 'E1'), true)
    board.forcePut('D2', board.take('A9'))
    assert.equal(board.move('E1', 'D2'), true)
  })

  it('cannot move outside king zone', () => {
    board.reset()
    assert.equal(board.move('D0', 'C1'), false)
    board.move('D0', 'E1')
    board.move('E1', 'F2')
    assert.equal(board.move('F2', 'G1'), false)
  })

  it('cannot move if blocked by ally', () => { 
    board.reset()
    board.forcePut('E1', board.take('E0'))
    assert.equal(board.move('D0', 'E1'), false)
  })
})