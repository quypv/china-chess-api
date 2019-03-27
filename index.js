let c = require('./src/base/constants')
let NormalGame = require('./src/game/normalGame')
let Render = require('./src/base/render')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const IN_DEBUG = 'IN_DEBUG'
const IN_CONSOLE = 'IN_CONSOLE'

let game = new NormalGame()
let mode = IN_CONSOLE

//----------------------------------------------------
let runOneMove = (player) => {
  let nextMove = game.getSuggesionMove(player)
  if (nextMove) {
    console.log(nextMove.fromPos, nextMove.toPos)
    game.move(nextMove.fromPos, nextMove.toPos)
  }
}

let manualRun = (player) => {
  readline.question(`bot move? `, (yn) => {
    if (yn.toLowerCase() === 'n') {
      readline.close()
      throw 'exited!'
    }
    else {
      player = player === c.BLACK ? c.RED : c.BLACK
      runOneMove(player)
      Render.print(game)
      manualRun(player)
    }
  })
}

//----------------------------------------------------
if (mode === IN_CONSOLE) {
  readline.question(`New game?`, (yn) => {
    if (yn.toLowerCase() === 'n') readline.close()
    else Render.print(game)

    let player = c.RED
    manualRun(player)
  })  
}

if (mode === IN_DEBUG) {
  let player = c.RED
  let maxTurn = 5
  let turn = 1
  
  do  {
    player = player === c.BLACK ? c.RED : c.BLACK
    runOneMove(player)
    turn++
  }
  while(turn <= maxTurn)
}