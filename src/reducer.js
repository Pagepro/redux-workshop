import { createStore } from 'redux'

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'INIT':
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export {
  store
}


