const c = require('../../src/constants')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
var assert = require('assert')

describe('Cannon movement', () => {
  let board = new Board()
  board.init()
  
  it('can move right', () => {
    board.reset()
    assert.equal(board.move('B2', 'E2'), true)
  })

  it('can move left', () => {
    board.reset()
    assert.equal(board.move('B2', 'A2'), true)
  })

  it('can move down', () => {
    board.reset()
    assert.equal(board.move('B2', 'B5'), true)
  })

  it('can move down', () => {
    board.reset()
    assert.equal(board.move('B2', 'B1'), true)
  })

  it('can take down enemy', () => {
    board.reset()
    assert.equal(board.move('B2', 'B6'), true)
    assert.equal(board.move('B6', 'E6'), true)
  })

  it('can take down enemy continously', () => {
    board.reset()
    assert.equal(board.move('B2', 'B6'), true)
    assert.equal(board.move('B6', 'E6'), true)
    assert.equal(board.move('E6', 'I6'), true)
    assert.equal(board.move('I6', 'C6'), true)
    //Render.print(board)
  })
})