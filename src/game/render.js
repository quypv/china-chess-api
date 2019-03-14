const c = require('../constants')

const build = (board) => {
  let map = board.map
  let txt = ''

  txt += '      ' + c.X_AXIS.split('').join('  ') + "\n"
  txt += '    ' + (Array(c.X_AXIS.length * 3 + 2).fill('=')).join('') + "\n"

  for (let y of c.Y_AXIS) {
    let line = ''+y+' || '

    for (let x of c.X_AXIS) {
      let troop = map[x+y]
      line += ' ' + (troop ? troop.symbol : '.') + ' '
    }

    line += ' || ' + y
    txt += line + "\n"
  }

  txt += '    ' + (Array(c.X_AXIS.length * 3 + 2).fill('=')).join('') + "\n"
  txt += '      ' + c.X_AXIS.split('').join('  ') + "\n"

  return txt
}

const print = (board) => {
  console.log(build(board))
}

module.exports = {
  print,
}