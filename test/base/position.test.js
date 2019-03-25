const p = require('../../src/base/position')
var assert = require('assert')

describe('Position helper', () => {
  it('up', () => {
    assert.equal(p.up('A9'), 'A8')
    assert.equal(p.up('A0'), null)
    assert.equal(p.up('Z9'), null)
    assert.equal(p.up('C6', 2), 'C4')
    assert.equal(p.up('C6', 20), null)
  })

  it('down', () => {
    assert.equal(p.down('A9'), null)
    assert.equal(p.down('B4'), 'B5')
    assert.equal(p.down('Z9'), null)
    assert.equal(p.down('B4', 5), 'B9')
    assert.equal(p.down('B4', 50), null)
  })

  it('left', () => {
    assert.equal(p.left('A3'), null)
    assert.equal(p.left('F3'), 'E3')
    assert.equal(p.left('D3', 3), 'A3')
    assert.equal(p.left('D3', 30), null)
    assert.equal(p.left('Z9'), null)
  })

  it('right', () => {
    assert.equal(p.right('I2'), null)
    assert.equal(p.right('G2'), 'H2')
    assert.equal(p.right('G2', 2), 'I2')
    assert.equal(p.right('G2', 20), null)
    assert.equal(p.right('Z9'), null)
  })
})
