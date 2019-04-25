const PuzzleGame = require('../../src/game/puzzleGame')
const Render = require('../../src/base/render')
const c = require('../../src/base/constants')
var assert = require('assert')

describe('Bot One - Alpha Beta Pruner', () => {
  

  it('could create new match', () => {
    let game = new PuzzleGame(JSON.stringify({
      E0: 'K', 
      B4: 'R', D4: 'c', F4: 'P', H4: 'N',
      F5: 'n', 
      E7: 'r', C9: 'g', E9: 'k',
    }))
    Render.print(game)
    
    let move = game.getSuggesionMove(c.BLACK)
    // console.log(move.toString())

  })

})