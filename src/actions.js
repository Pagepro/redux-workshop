import {
    SET_GAME_START,
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS
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






// fetchQuestions () {
//     fetchQuestions(this.props.difficulty)
//       .then(questions => {
//         this.setState({
//           questions
//         }, this.generateQuestion)
//       })
//   }
