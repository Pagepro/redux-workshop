import {
    SET_GAME_STARTED,
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS,
    SET_GOOD_ANSWER,
    SET_BAD_ANSWER,
    USE_SPECTATORS_LINE,
    USE_HALF_ON_HALF_LINE,
    USE_CALL_FRIEND_LINE,
    SET_CURRENT_QUESTION_ANSWERS
} from './actionTypes'
import {
  fetchQuestions
} from './helpers'
import { shuffle } from 'lodash'

  const setupAppAction = data => ({
    type: SETUP_APP,
    payload: data
  })

  const setGameStartedAction = () => ({
    type: SET_GAME_STARTED
  })

  const resetGameAction = () => ({
    type: RESET_GAME
  })

  const getQuestionsAction = data => ({
    type: GET_QUESTIONS,
    payload: data
  })

  const setGoodAnswerAction = data => ({
    type: SET_GOOD_ANSWER,
    payload: data
  })

  const setBadAnswerAction = data => ({
    type: SET_BAD_ANSWER,
    payload: data
  })

  const useSpectatorsLineAction = () => ({
    type: USE_SPECTATORS_LINE
  })

  const useHalfOnHalfLineAction = () => ({
    type: USE_HALF_ON_HALF_LINE
  })

  const useCallFriendLineAction = () => ({
    type: USE_CALL_FRIEND_LINE
  })

  const setCurrentQuestionAnswersAction = data => ({
    type: SET_CURRENT_QUESTION_ANSWERS,
    payload: data
  })

  export const setupApp = (nick, difficulty) => dispatch => {
    dispatch(setupAppAction({ nick, difficulty }))
  }

  export const setGameStarted = () => dispatch => {
    dispatch(setGameStartedAction())
  }

  export const resetGame = () => dispatch => {
    dispatch(resetGameAction())
  }

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

  export const setAnswer = goodAnswer => dispatch => {
    if (goodAnswer) {
      dispatch(setGoodAnswerAction())
    } else {
      dispatch(setBadAnswerAction())
    }
  }

  export const useSpectatorsLine = () => dispatch => {
    dispatch(useSpectatorsLineAction())
  }

  export const useHalfOnHalfLine = () => dispatch => {
    dispatch(useHalfOnHalfLineAction())
  }

  export const useCallFriendLine = () => dispatch => {
    dispatch(useCallFriendLineAction())
  }

  export const setCurrentQuestionAnswers = data => dispatch => {
    dispatch(setCurrentQuestionAnswersAction(data))
  }