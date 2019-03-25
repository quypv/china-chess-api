const c = require('../../../src/base/constants')
const Board = require('../../../src/base/board')
const Render = require('../../../src/base/render')
var assert = require('assert')

describe('Knight movement', () => {
  let board = new Board()
  board.init()

  it('can jump up', () => {
    board.reset()
    assert.equal(board.move('B9', 'A7'), true)
    assert.equal(board.move('H9', 'G7'), true)
    board.reset()
    assert.equal(board.move('B9', 'C7'), true)
    assert.equal(board.move('H9', 'I7'), true)
  })

  it('can jump down', () => { 
    board.reset()
    assert.equal(board.move('B0', 'A2'), true)
    assert.equal(board.move('H0', 'G2'), true)
    board.reset()
    assert.equal(board.move('B0', 'C2'), true)
    assert.equal(board.move('H0', 'I2'), true)
  })

  it('can jump left', () => { 
    board.reset()
    board.forcePut('C4', board.take('B0'))
    assert.equal(board.move('C4', 'A5'), true)
  })

  it('can jump right', () => { 
    board.reset()
    board.forcePut('C4', board.take('B0'))
    assert.equal(board.move('C4', 'E5'), true)
  })

  it('can move continously', () => { 
    board.reset()
    assert.equal(board.move('B0', 'C2'), true)
    assert.equal(board.move('C2', 'E1'), true)
    assert.equal(board.move('E1', 'D3'), true)
    assert.equal(board.move('D3', 'C5'), true)
  })

  it('can take down enemy', () => { 
    board.reset()
    board.move('B9', 'C7')
    board.move('C7', 'E8')
    board.move('E8', 'D6')
    board.move('D6', 'C4')
    assert.equal(board.move('C4', 'E3'), true)
  })

  it('cannot jump if path is blocked', () => { 
    board.reset()
    board.move('H9', 'G7')
    assert.equal(board.move('G7', 'F5'), false)
    assert.equal(board.move('G7', 'H5'), false)
    assert.equal(board.move('G7', 'I6'), false)
    assert.equal(board.move('G7', 'I8'), false)
    assert.equal(board.move('G7', 'E6'), false)

    board.forcePut('E4', board.take('G7'))
    assert.equal(board.move('E4', 'F2'), false)
    assert.equal(board.move('E4', 'D2'), false)
  })

  it('cannot jump outside the board', () => { 
    board.reset()
    board.move('H9', 'I7')
    assert.equal(board.move('I7', 'J9'), false)
  })

  it('cannot jump if destination is blocked', () => { 
    board.reset()
    board.move('B0', 'C2')
    assert.equal(board.move('C2', 'E3'), false)
    assert.equal(board.move('C2', 'D0'), false)
  })
})