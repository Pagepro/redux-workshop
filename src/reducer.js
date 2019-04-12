import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import {
  SET_GAME_STARTED,
  SETUP_APP,
  RESET_GAME,
  GET_QUESTIONS,
  SET_GOOD_ANSWER,
  SET_BAD_ANSWER
} from './actionTypes'

const mainDefaultState = {
  gameStarted: false,
  nick: '',
  difficulty: '',
  hasWon: false,
  isGameFinished: false
}

const gameReducerDefaultState = {
  questions: [],
  currentQuestion: {},
  answers: [],
  currentQuestionNumber: 0,
  answer: {}
}

const mainReducer = (state = mainDefaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STARTED:
      return {
        ...state,
        gameStarted: true
      }
    case SETUP_APP:
      return {
        ...state,
        ...payload
      }
    case SET_BAD_ANSWER:
      return {
        ...state,
        isGameFinished: true
      }
    case RESET_GAME:
      return mainDefaultState
    default:
      return state
  }
}

const gameReducer = (state = gameReducerDefaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_QUESTIONS: {
      return {
        ...state,
        questions: payload
      }
    }
    case SET_GOOD_ANSWER:
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber++
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  global: mainReducer,
  game: gameReducer
})

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export {
  store
}


