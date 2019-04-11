import React from 'react'
import PropTypes from 'prop-types'
import {
  getGuaranteedReward
} from './helpers'
import { connect } from 'react-redux'

const EndScreen = props => {
  console.log(props)
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

const mapDispatchToProps = state => ({
  resetGame: () => {

  }
})

EndScreen.propTypes = {
  hasWon: PropTypes.bool,
  currentQuestionNumber: PropTypes.number,
  resetGame: PropTypes.func
}

export default EndScreen
