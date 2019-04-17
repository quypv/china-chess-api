const CONFIG = {}

// ---------------------------------------- 
// Scan troop moves: disable when possible 
// to reduce performance costs
// ---------------------------------------- 
CONFIG.lockScanMove = false
CONFIG.lockScanMoveCount = 0

const lockScanMovesFlow = () => {
  CONFIG.lockScanMove = true
}

const releaseScanMovesFlow = () => {
  CONFIG.lockScanMove = false
}

const scanMovesFlowIsLocked = () => {
  return CONFIG.lockScanMove
}

const scanMovesFlowCount = () => {
  CONFIG.lockScanMoveCount++
}

const scanMovesFlowGetCount = () => {
  return CONFIG.lockScanMoveCount
}

const ScanMovesFlow = {
  lock: lockScanMovesFlow,
  release: releaseScanMovesFlow,
  isLocked: scanMovesFlowIsLocked,
  count: scanMovesFlowCount,
  getCount: scanMovesFlowGetCount,
}

// ---------------------------------------- 
// Exports
// ---------------------------------------- 
module.exports = {
  ScanMovesFlow
}