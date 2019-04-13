import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import EndScreen from './EndScreen'
import { connect } from 'react-redux'
import { resetGame, getQuestions, setAnswer } from './actions'

class Game extends Component {
  constructor (props) {
    super(props)

    this.generateQuestion = this.generateQuestion.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.setCurrentQuestionAnswers = this.setCurrentQuestionAnswers.bind(this)
  }

  componentDidMount () {
    const {
      nick,
      difficulty,
      gameStarted,
      history
    } = this.props

    if (!nick || !difficulty || !gameStarted) {
      history.replace('/')
      return
    }
    this.props.getQuestions()
  }

  async resetGame () {
    await this.props.resetGame()
    this.props.history.push('/')
  }

  generateQuestion () {
    const currentQuestion = this.props.questions[this.props.currentQuestionNumber]

    return currentQuestion
  }

  setCurrentAnswer (answer) {
    return () => {
      const {
        correctAnswer
      } = this.generateQuestion()
      const {
        setAnswer
      } = this.props

      return answer === correctAnswer ? setAnswer(true) : setAnswer(false)
    }
  }

  confirmCheckedAnswer () {
    const {
      answer,
      currentQuestion: {
        correctAnswer
      },
      currentQuestionNumber
    } = this.state

    if (this.state.answer === '') {
      return
    }

    if (answer.text === correctAnswer) {
      if (currentQuestionNumber !== 11) {
        this.setState(prevState => ({
          currentQuestionNumber: prevState.currentQuestionNumber + 1,
          answer: {}
        }), this.generateQuestion)
      } else {
        this.setState({
          isGameFinished: true,
          hasWon: true
        })
      }
    } else {
      this.setState({
        isGameFinished: true,
        hasWon: false
      })
    }
  }

  setCurrentQuestionAnswers (answers) {
    this.setState({
      answers: [
        ...answers
      ]
    })
  }

  render () {
    const {
      questions,
      currentQuestionNumber,
      isGameFinished,
      hasWon
    } = this.props

    if(!questions.length) {
      return null
    }

    const {
      question,
      answers,
      correctAnswer
    } = this.generateQuestion()

    return isGameFinished
      ? (
        <EndScreen
          hasWon={hasWon}
          currentQuestionNumber={currentQuestionNumber}
          resetGame={this.resetGame}
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
            setCurrentQuestionAnswers={this.setCurrentQuestionAnswers}
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
  nick: state.global.nick,
  difficulty: state.global.difficulty,
  gameStarted: state.global.gameStarted,
  questions: state.game.questions,
  currentQuestionNumber: state.game.currentQuestionNumber,
  isGameFinished: state.global.isGameFinished,
  hasWon: state.global.hasWon
})

export default connect(mapStateToProps, { resetGame, getQuestions, setAnswer })(Game)
