import { createStore, compose } from 'redux'
import {
  SET_GAME_STARTED
} from './actionTypes'

const defaultState = {
  nick: '',
  difficulty: null,
  gameStarted: false
}

const reducer = (state = defaultState, action) => {
  const { type } = action

  switch (type) {
    case SET_GAME_STARTED:
      return {
        ...state,
        gameStarted: true
      }
    default:
      return state
  }
}

export const setGameStarted = () => ({
  type: SET_GAME_STARTED
})

const store = createStore(
  reducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export {
  store
}