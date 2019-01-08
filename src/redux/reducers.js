import { combineReducers } from 'redux';
import { 
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'

const initUser = {
  username: '', //用户名
  type: '', //用户类型
  msg: '' // 错误提示信息
}

function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, ...action.data} //先取原来的值，再覆盖
    case ERROR_MSG:
      return {...state, msg: action.data} 
    default:
      return state
  }
}

export default combineReducers({
  user
})