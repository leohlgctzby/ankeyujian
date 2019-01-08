import { reqRegister, reqLogin } from '../api'
import { 
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'

//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

//注册异步action
export const register = (user) => {
  return async dispatch => {
    const response = await reqRegister(user)
    const result = response.data
    if(result.code===0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))

    } 
  })
  }
}

//登录异步action
export const login = (user) => {
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  })
  }
}