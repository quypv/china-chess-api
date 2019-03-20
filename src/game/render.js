const c = require('../constants')
const Board = require('./board')
const Game = require('./game')

const build = (boardOrGame) => {
  let board

  if (boardOrGame instanceof Game) {
    board = boardOrGame.board
  }
  else if (boardOrGame instanceof Board) {
    board = boardOrGame
  }
  else {
    return false
  }
  
  let map = board.map
  let txt = ''

  txt += '      ' + c.X_AXIS.split('').join('  ') + "\n"
  txt += '    ' + (Array(c.X_AXIS.length * 3 + 2).fill('=')).join('') + "\n"

  for (let y of c.Y_AXIS) {
    let line = ''+y+' || '

    for (let x of c.X_AXIS) {
      let troop = map[x+y]
      line += ' ' + (troop ? troop.symbol : String.fromCharCode(0x2022)) + ' '
    }

    line += ' || ' + y
    txt += line + "\n"
  }

  txt += '    ' + (Array(c.X_AXIS.length * 3 + 2).fill('=')).join('') + "\n"
  txt += '      ' + c.X_AXIS.split('').join('  ') + "\n"

  return txt
}

const print = (boardOrGame) => {
  console.log(build(boardOrGame))
}

module.exports = {
  print,
}