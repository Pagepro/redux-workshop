import React from 'react'
import PropTypes from 'prop-types'
import {
  sample
} from 'lodash'
import {
  useSpectatorsLine,
  useCallFriendLine,
  useHalfOnHalfLine,
  setCurrentQuestionAnswers
} from './actions'
import { connect } from 'react-redux'

class LifeLines extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      callFriendUsed: false,
      spectatorsUsed: false,
      halfOnHalfUsed: false
    }

    this.useSpectatorsLine = this.useSpectatorsLine.bind(this)
    this.useCallFriendLine = this.useCallFriendLine.bind(this)
    this.useHalfOnHalfLine = this.useHalfOnHalfLine.bind(this)
  }

  useSpectatorsLine () {
    window.alert(`Spectators: ${this.props.correctAnswer}`)

    this.props.useSpectatorsLine()
  }

  useCallFriendLine () {
    window.alert(`Friend: ${this.props.correctAnswer}`)

    this.props.useCallFriendLine()
  }

  useHalfOnHalfLine () {
    const {
      setCurrentQuestionAnswers,
      currentQuestion
    } = this.props

    const leftoverIncorrectAnswer = sample(
      currentQuestion.answers
        .filter(answer => answer !== currentQuestion.correctAnswer)
      )

    setCurrentQuestionAnswers([currentQuestion.correctAnswer, leftoverIncorrectAnswer])

    this.props.useHalfOnHalfLine()
  }

  render () {
    const {
      callFriendUsed,
      spectatorsUsed,
      halfOnHalfUsed
    } = this.state

    return (
      <div className='c-lifelines'>
        <button
          onClick={this.useHalfOnHalfLine}
          disabled={halfOnHalfUsed}
        >
          50/50
        </button>
        <button
          onClick={this.useCallFriendLine}
          disabled={callFriendUsed}
        >
          call friend
        </button>
        <button
          onClick={this.useSpectatorsLine}
          disabled={spectatorsUsed}
        >
          spectators help
        </button>
      </div>
    )
  }
}

LifeLines.propTypes = {
  correctAnswer: PropTypes.string,
  setCurrentQuestionAnswers: PropTypes.func,
  answers: PropTypes.array,
  currentQuestionNumber: PropTypes.number,
  onChange: PropTypes.func
}

const mapStateToProps = state => ({
  callFriendUsed: state.game.callFriendUsed,
  spectatorsUsed: state.game.spectatorsUsed,
  halfOnHalfUsed: state.game.halfOnHalfUsed,
  currentQuestion: state.game.currentQuestion
})

export default connect(mapStateToProps, {
  useSpectatorsLine,
  useCallFriendLine,
  useHalfOnHalfLine,
  setCurrentQuestionAnswers
})(LifeLines)
