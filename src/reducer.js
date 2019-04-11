import { createStore , compose } from 'redux'
import {
  SET_GAME_STARTED,
  SETUP_APP,
  RESET_GAME
} from './actionTypes'

const defaultState = {
  gameStarted: false
}

export const setGameStarted = {
  type: SET_GAME_STARTED
}

export const resetGame = {
  type: RESET_GAME
}

const reducer = (state = defaultState, action) => {
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
    default:
      return state
  }
}

const store = createStore(
  reducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export {
  store
}


