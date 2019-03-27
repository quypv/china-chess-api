const c = require('./constants')
const Board = require('./board')
const Match = require('./match')

const build = (boardMatchGame) => {
  let board

  if (boardMatchGame.match instanceof Match) {
    board = boardMatchGame.match.board
  }
  else if (boardMatchGame instanceof Match) {
    board = boardMatchGame.board
  }
  else if (boardMatchGame instanceof Board) {
    board = boardMatchGame
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

const print = (boardMatchGame) => {
  console.log(build(boardMatchGame))
}

module.exports = {
  print,
}