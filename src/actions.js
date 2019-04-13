import {
    SET_GAME_START,
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS,
    SET_GOOD_ANSWER,
    SET_BAD_ANSWER
} from './actionTypes'
import { fetchQuestions } from './helpers'
import { shuffle } from 'lodash'

export const setGameStart = () => dispatch => {
    dispatch(setGameStartAction())
}

export const setGameStartAction = () => ({
    type: SET_GAME_START
})

export const setupApp = (nick, difficulty) => dispatch => {
    dispatch(setupAppAction(nick, difficulty))
}

export const setupAppAction = (nick, difficulty) => ({
    type: SETUP_APP,
    payload: { nick, difficulty }
})

export const resetGame = () => dispatch => {
    dispatch(resetGameAction())
}

export const resetGameAction = () => ({
    type: RESET_GAME
})

export const getQuestions = difficulty => async dispatch => {
    const response = await fetchQuestions(difficulty)

    const questions = response.map(item => {
        const {
            incorrectAnswers,
            ...rest
        } = item

        return {
            ...rest,
            answers: shuffle([rest.correctAnswer, ...incorrectAnswers])
        }
    })

    dispatch(getQuestionsAction(questions))
}

const getQuestionsAction = data => ({
    type: GET_QUESTIONS,
    payload: data
})

export const setAnswer = isGoodAnswer => dispatch => {
    return isGoodAnswer ?
        dispatch(setGoodAnswerAction()) : dispatch(setBadAnswerAction())
}

const setGoodAnswerAction = () => ({
    type: SET_GOOD_ANSWER
})

const setBadAnswerAction = () => ({
    type: SET_BAD_ANSWER
})




// fetchQuestions () {
//     fetchQuestions(this.props.difficulty)
//       .then(questions => {
//         this.setState({
//           questions
//         }, this.generateQuestion)
//       })
//   }
