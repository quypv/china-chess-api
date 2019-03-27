const c = require('../game/constants')
const BotBase = require('./base')
const BotOne = require('./botOne')

class BotFactory
{
  /**
   * @param {string} color
   * @param {string} level 
   * @return {BotBase}
   */
  factory(color, level = c.EASY_GREEDY) {
    switch(level) {
      default:
        return new BotOne(color)
    }
  }
}

module.exports = BotFactory
