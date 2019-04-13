import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import {
    SET_GAME_START,
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS
} from './actionTypes'
import thunk from 'redux-thunk'

const defaultState = {
    nick: '',
    difficulty: null,
    gameStarted: false,
    isGameFinished: false,
    hasWon: false
}

const gameDefaultState = {
    questions: [],
    currentQuestion: {},
    answers: [],
    currentQuestionNumber: 0,
    answer: {}
  }

const reducer = (state = defaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_GAME_START: {
            return {
                ...state,
                gameStarted: true
            }
        }
        case SETUP_APP: {
            return {
                ...state,
                nick: payload.nick,
                difficulty: payload.difficulty
            }
        }
        case RESET_GAME: {
            return defaultState
        }
        default:
        return state
    }
}

const gameReducer = (state = gameDefaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_QUESTIONS: {
            return {
                ...state,
                questions: payload
            }
        }
        default:
            return state
    }
}

const store = createStore(
    combineReducers({
        global: reducer,
        game: gameReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    )

export {
    store
}