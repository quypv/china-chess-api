const c = require('../../src/constants')
const Game = require('../../src/game/game')
const Board = require('../../src/game/board')
const Render = require('../../src/game/render')
var assert = require('assert')

describe('Game', () => {

  it('could create new game', () => {
    var game = new Game()
    var board = game.board

    assert.equal(board instanceof Board, true)
  })

  it('could move troop', () => {
    var game = new Game()

    assert.equal(game.move('A9', 'A8'), true)
    assert.equal(game.move('B7', 'B3'), true)
    assert.equal(game.move('B2', 'B9'), true)
  })

  it('could save history', () => {
    var game = new Game()
    game.move('A9', 'A8')
    assert.equal(game.history.count(), 1)
    game.move('A8', 'I8')
    assert.equal(game.history.count(), 2)
  })

  it('could undo a move', () => {
    var game = new Game()

    game.move('B7', 'B5')
    game.move('B5', 'D5')
    assert.equal(game.board.at('B7'), null)
    assert.equal(game.board.at('B5'), null)
    assert.notEqual(game.board.at('D5'), null)

    game.undo()
    assert.equal(game.board.at('D5'), null)
    assert.notEqual(game.board.at('B5'), null)

    game.undo()
    assert.equal(game.board.at('D5'), null)
    assert.equal(game.board.at('B5'), null)
    assert.notEqual(game.board.at('B7'), null)
  })

})