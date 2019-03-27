const HUMAN = 'HUMAN'
const BOT = 'BOT'
const RED = 'RED'
const BLACK = 'BLACK'

const EASY_GREEDY = 'BOT_EASY_GREEDY'

const BEGINNER = 'HUMAN_BEGINNER'

const DEFAULT_HUMAN = {
  type: HUMAN,
  level: BEGINNER,
}

const DEFAULT_BOT = {
  type: BOT,
  level: EASY_GREEDY,
  actor: null,
}

module.exports = {
  HUMAN, BOT,
  DEFAULT_HUMAN, DEFAULT_BOT,
  RED, BLACK,
  EASY_GREEDY,
  BEGINNER,
}