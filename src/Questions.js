import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAnswer } from './actions'

class Questions extends React.Component {
  constructor (props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
  }

  setCurrentAnswer (answer) {
    return () => {
      const {
        currentQuestion,
        setAnswer
      } = this.props

      return answer !== currentQuestion.correctAnswer ? setAnswer(false) : setAnswer(true)
    }
  }

  renderItem (item, index) {
    return (
      <li
        key={`${index}-answer`}
        className={`c-question ${item.disabled ? 'is-disabled' : ''}`}
        onClick={item.disabled ? null : this.setCurrentAnswer(item)}
      >
        <span className='c-question__label'>
          {String.fromCharCode(65 + index)}: {item}
        </span>
      </li>
    )
  }

  render () {
    const {
      currentQuestion
    } = this.props

    return (
      <div className='c-questions'>
        <p className='c-questions__title c-question'>
          {currentQuestion.question}
        </p>
        <ul className='c-questions__list'>
          {currentQuestion.answers.map(this.renderItem)}
        </ul>
      </div>
    )
  }
}

Questions.propTypes = {
  answers: PropTypes.array,
  question: PropTypes.string,
  answer: PropTypes.object,
  onSelect: PropTypes.func,
  setAnswer: PropTypes.func,
  correctAnswer: PropTypes.string
}

const mapStateToProps = state => ({
  currentQuestion: state.game.currentQuestion
})

export default connect(mapStateToProps, {
  setAnswer
})(Questions)
