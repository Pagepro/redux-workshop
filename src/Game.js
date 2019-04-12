import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import EndScreen from './EndScreen'
import { connect } from 'react-redux'
import {
  resetGame,
  getQuestions,
  setAnswer
} from './actions'

class Game extends Component {
  constructor (props) {
    super(props)

    // TODO REMOVE AFTER
    this.state = {
      questions: [],
      currentQuestion: {},
      answers: [],
      currentQuestionNumber: 0,
      answer: {}
    }

    this.resetGame = this.resetGame.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
  }

  componentDidMount () {
    const {
      appSettings: {
        nick,
        difficulty,
        gameStarted
      },
      history
    } = this.props

    if (!nick || !difficulty || !gameStarted) {
      history.replace('/')
      return
    }
    this.props.getQuestions()
  }

  setCurrentAnswer (answer) {
    return () => {
      const {
        questions,
        currentQuestionNumber,
        setAnswer
      } = this.props

      const currentQuestion = questions[currentQuestionNumber]

      return answer !== currentQuestion.answer ? setAnswer(false) : setAnswer(true)
    }
  }

  async resetGame () {
    await this.props.resetGame()
    this.props.history.push('/')
  }

  render () {
    const {
      questions,
      currentQuestionNumber
    } = this.props

    if (!questions.length) {
      return null
    }

    const {
      question,
      correctAnswer,
      answers
    } = questions[currentQuestionNumber]

    const {
      isGameFinished,
      hasWon
    } = this.state

    return isGameFinished
      ? (
        <EndScreen
          resetGame={this.resetGame}
          hasWon={hasWon}
          currentQuestionNumber={currentQuestionNumber}
        />
      )
      : (
        <div className='l-game'>
          <Background>
            <div className='c-questions'>
              <Questions
                question={question}
                answers={answers}
                correctAnswer={correctAnswer}
                onSelect={this.setCurrentAnswer}
              />
            </div>
          </Background>
          <SidePanel
            currentQuestionNumber={currentQuestionNumber}
            correctAnswer={correctAnswer}
            answers={answers}
            setCurrentQuestionAnswers={this.setCurrentAnswer}
          />
        </div>
      )
  }
}

Game.propTypes = {
  appSettings: PropTypes.object,
  history: PropTypes.object,
  resetGame: PropTypes.func
}

const mapStateToProps = state => ({
  appSettings: state.global,
  questions: state.game.questions,
  currentQuestionNumber: state.game.currentQuestionNumber

})

export default connect(mapStateToProps, {
  resetGame,
  getQuestions,
  setAnswer
})(Game)
