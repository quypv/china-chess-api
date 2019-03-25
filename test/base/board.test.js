const c = require('../../src/base/constants')
const Board = require('../../src/base/board')
const Render = require('../../src/base/render')
var assert = require('assert')

describe('New board', () => {
  var board = new Board()
  board.init()

  it('should have 32 troops on board', () => {
    assert.equal(board.countTroopOnBoard(), 32)
  })

  it('should have 16 RED troops', () => {
    assert.equal(board.countTroopOnBoard(c.RED), 16)
  })

  it('should have 16 BLACK troops', () => {
    assert.equal(board.countTroopOnBoard(c.BLACK), 16)
  })
})

describe('Take & put', () => {
  var board = new Board()
  board.init()

  it('could put inside board', () => {
    let cannon = board.take('B7')
    board.put('B4', cannon)
    
    //Render.print(board)
    assert.equal(board.at('B7'), null)
    assert.equal(board.at('B4').symbol, 'c')
    assert.equal(board.countTroopOnBoard(), 32)
  })

  it('could not put outside board', () => {
    board.reset()

    let cannon = board.take('B7')
    board.put('Z9', cannon)
    assert.equal(board.countTroopOnBoard(), 31)
    //Render.print(board)
  })
})
