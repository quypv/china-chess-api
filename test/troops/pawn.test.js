const c = require('../../src/constants')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
var assert = require('assert')

describe('Pawn movement', () => {
  let board = new Board()
  board.init()
  
  it('can move forward', () => {
    board.reset()
    assert.equal(board.move('C6', 'C5'), true)
  })

  it('can move forward continuosly', () => {
    board.reset()
    assert.equal(board.move('C6', 'C5'), true)
    assert.equal(board.move('C5', 'C4'), true)
  })

  it('can take down enemy', () => {
    board.reset()
    board.move('C6', 'C5')
    board.move('C5', 'C4')
    assert.equal(board.move('C4', 'C3'), true)
  })

  it('can move left/right on enemy side', () => {
    board.reset()
    board.move('C6', 'C5')
    board.move('C5', 'C4')
    assert.equal(board.move('C4', 'D4'), true)
    
  })

  it('cannot move horizontally on ally side', () => {
    board.reset()
    assert.equal(board.move('C6', 'D6'), false)
    board.move('C6', 'C5')
    assert.equal(board.move('C5', 'D5'), false)
  })

  it('cannot move 2 steps', () => {
    board.reset()
    assert.equal(board.move('C6', 'C4'), false)
    board.move('C6', 'C5')
    board.move('C5', 'C4')
    assert.equal(board.move('C4', 'E4'), false)
  })

  it('cannot go back', () => {
    board.reset()
    assert.equal(board.move('C6', 'C7'), false)
    board.move('C6', 'C5')
    board.move('C5', 'C4')
    assert.equal(board.move('C4', 'C5'), false)
  })
})
