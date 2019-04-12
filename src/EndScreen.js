import React from 'react'
import PropTypes from 'prop-types'
import {
  getGuaranteedReward
} from './helpers'
import { connect } from 'react-redux'
import { resetGame } from './actions'

const EndScreen = props => {
  const {
    hasWon,
    currentQuestionNumber,
    resetGame
  } = props
  const reward = hasWon
    ? 1000000
    : getGuaranteedReward(currentQuestionNumber)

  return (
    <div className='l-end'>
      <p>
        You won {reward} $
      </p>
      <button
        type='button'
        onClick={resetGame}
        className='c-start-link'
      >
        Reset Game
      </button>
    </div>
  )
}

EndScreen.propTypes = {
  hasWon: PropTypes.bool,
  currentQuestionNumber: PropTypes.number,
  resetGame: PropTypes.func
}

const mapStateToProps = state => ({
  hasWon: state.global.hasWon,
  currentQuestionNumber: state.game.currentQuestionNumber
})

export default connect(mapStateToProps, { resetGame })(EndScreen)
