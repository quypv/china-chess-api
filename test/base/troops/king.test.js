const c = require('../../../src/base/constants')
const Board = require('../../../src/base/board')
const Render = require('../../../src/base/render')
var assert = require('assert')

describe('King movement', () => {
  let board = new Board()
  board.init()
  
  it('can move straightly in king zone & one step only', () => {
    board.reset()

    assert.equal(board.move('E0', 'D1'), false)
    assert.equal(board.move('E0', 'E2'), false)

    assert.equal(board.move('E0', 'E1'), true)
    assert.equal(board.move('E1', 'D1'), true)
    assert.equal(board.move('D1', 'D2'), true)

    assert.equal(board.move('E9', 'E8'), true)
    assert.equal(board.move('E8', 'D8'), true)
    assert.equal(board.move('D8', 'D7'), true)
  })

  it('can take down enemy', () => { 
    board.reset()
    board.move('E0', 'E1')
    board.forcePut('D1', board.take('A9'))

    assert.equal(board.move('E1', 'D1'), true)
    assert.equal(board.countTroopOnBoard(), 31)
    assert.equal(board.countTroopOnBoard(c.RED), 16)
    assert.equal(board.countTroopOnBoard(c.BLACK), 15)
  })

  it('cannot move outside king zone', () => {
    board.reset()

    board.forcePut('D1', board.take('E0'))
    assert.equal(board.move('D1', 'C1'), false)
    
    board.forcePut('D8', board.take('E9'))
    assert.equal(board.move('D8', 'C8'), false)
  })

  it('cannot move if blocked by ally', () => { 
    board.reset()

    board.forcePut('E1', board.take('D0'))
    assert.equal(board.move('E0', 'E1'), false)
  })
})