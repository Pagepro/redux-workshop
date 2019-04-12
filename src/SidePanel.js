import React from 'react'
import QuestionsList from './QuestionsList'
import LifeLines from './LifeLines'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class SidePanel extends React.Component {
  render () {
    const {
      currentQuestionNumber
    } = this.props

    return (
      <div className='c-side'>
        <LifeLines />
        <QuestionsList
          currentQuestionNumber={currentQuestionNumber}
        />
      </div>
    )
  }
}

SidePanel.propTypes = {
  currentQuestionNumber: PropTypes.number,
  correctAnswer: PropTypes.string,
  answers: PropTypes.array,
  setCurrentQuestionAnswers: PropTypes.func
}

const mapStateToProps = state => ({
  currentQuestionNumber: state.game.currentQuestionNumber
})

export default connect(mapStateToProps)(SidePanel)
