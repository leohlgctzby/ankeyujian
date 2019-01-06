import { combineReducers } from 'redux';

const defaultState = {
  type:0
}

function xxx(state = defaultState, action) {
  return state
}

function yyy(state = defaultState, action) {
  return state
}

export default combineReducers({
  xxx,
  yyy
})