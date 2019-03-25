const c = require('./constants')

/**
 * @param {int} indexX
 */
const validateIndexX = (indexX) => {
  return 0 <= indexX && indexX < c.X_AXIS.length
}

/**
 * @param {int} indexY
 */
const validateIndexY = (indexY) => {
  return 0 <= indexY && indexY < c.Y_AXIS.length
}

/**
 * @param {string} x
 */
const validateX = (x) => {
  return c.X_AXIS.indexOf(x) !== -1
}

/**
 * @param {string} y 
 */
const validateY = (y) => {
  return c.Y_AXIS.indexOf(y) !== -1
}

/**
 * Valid position: [A-I][0-9]
 * @param {string} pos 
 */
const validate = (pos) => {
  return validateX(pos.charAt(0)) && validateY(pos.charAt(1))
}

/**
 * @param {string} currPos 
 * @param {int} step 
 */
const up = (currPos, step = 1) => {
  if (!validate(currPos)) return null

  let nextX  = currPos.charAt(0)
  let iNextY = c.Y_AXIS.indexOf(currPos.charAt(1)) - step

  if (!validateIndexY(iNextY)) return null

  return nextX + c.Y_AXIS.charAt(iNextY)
}

/**
 * @param {string} currPos 
 * @param {int} step 
 */
const down = (currPos, step = 1) => {
  if (!validate(currPos)) return null

  let nextX  = currPos.charAt(0)
  let iNextY = c.Y_AXIS.indexOf(currPos.charAt(1)) + step

  if (!validateIndexY(iNextY)) return null

  return nextX + c.Y_AXIS.charAt(iNextY)
}

/**
 * @param {string} currPos 
 * @param {int} step 
 */
const left = (currPos, step = 1) => {
  if (!validate(currPos)) return null

  let nextY  = currPos.charAt(1)
  let iNextX = c.X_AXIS.indexOf(currPos.charAt(0)) - step

  if (!validateIndexX(iNextX)) return null

  return c.X_AXIS.charAt(iNextX) + nextY
}

/**
 * @param {string} currPos 
 * @param {int} step 
 */
const right = (currPos, step = 1) => {
  if (!validate(currPos)) return null

  let nextY  = currPos.charAt(1)
  let iNextX = c.X_AXIS.indexOf(currPos.charAt(0)) + step
  
  if (!validateIndexX(iNextX)) return null

  return c.X_AXIS.charAt(iNextX) + nextY
}

/**
 * @param {string} currPos 
 * @param {int} stepUp 
 * @param {int} stepLeft 
 */
const upLeft = (currPos, stepUp = 1, stepLeft = 1) => {
  let upPos = up(currPos, stepUp)
  if (!upPos) return null
  
  return left(upPos, stepLeft)
}

/**
 * @param {string} currPos 
 * @param {int} stepUp
 * @param {int} stepRight
 */
const upRight = (currPos, stepUp = 1, stepRight = 1) => {
  let upPos = up(currPos, stepUp)
  if (!upPos) return null
  
  return right(upPos, stepRight)
}

/**
 * @param {string} currPos 
 * @param {int} stepUp 
 * @param {int} stepLeft 
 */
const downLeft = (currPos, stepUp = 1, stepLeft = 1) => {
  let downPos = down(currPos, stepUp)
  if (!downPos) return null
  
  return left(downPos, stepLeft)
}

/**
 * @param {string} currPos 
 * @param {int} stepUp
 * @param {int} stepRight
 */
const downRight = (currPos, stepUp = 1, stepRight = 1) => {
  let downPos = down(currPos, stepUp)
  if (!downPos) return null
  
  return right(downPos, stepRight)
}

/**
 * @param {string} color 
 */
const getRiverBorderY = (color = c.BLACK) => {
  return color === c.BLACK
    ? c.BLACK_RIVER_BORDER_Y
    : c.RED_RIVER_BORDER_Y
}

/**
 * @param {string} pos 
 * @param {string} color 
 * @return {boolean}
 */
const inKingZone = (pos, color = c.BLACK) => {
  let zone = color === c.BLACK 
    ? c.BLACK_KING_ZONE 
    : c.RED_KING_ZONE

  return zone.indexOf(pos) !== -1
}

module.exports = {
  up,
  down,
  left,
  right,
  upLeft,
  upRight,
  downLeft,
  downRight,
  validate,
  getRiverBorderY,
  inKingZone,
}