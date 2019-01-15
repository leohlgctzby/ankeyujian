import { reqRegister, reqLogin, reqUpdateUser, reqUser } from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from "./action-types";

//授权成功的同步action
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user });
//错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg });
//接收用户的同步action
const receiveUser = user => ({ type: RECEIVE_USER, data: user });
//重置用户的同步action
export const resetUser = msg => ({ type: RESET_USER, data: msg });

//注册异步action
export const register = user => {
  const { username, password, password2, type } = user;
  //表单的前台检查
  if (!username) {
    return errorMsg("用户名必须指定！");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致！");
  }

  //表单数据合法，返回一个发ajax请求的异步action函数
  return async dispatch => {
    const response = await reqRegister({ username, password, type });
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

//登录异步action
export const login = user => {
  const { username, password } = user;
  //表单的前台检查
  if (!username) {
    return errorMsg("用户名必须指定！");
  } else if (!password) {
    return errorMsg("密码必须指定！");
  }

  return async dispatch => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

//更新用户异步action
export const updateUser = user => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      //更新成功：data
      dispatch(receiveUser(result.data));
    } else {
      //更新失败：msg
      dispatch(resetUser(result.msg));
    }
  };
};

//获取用户异步action
export const getUser = () => {
  return async dispatch => {
    //执行异步ajax请求
    const response = await reqUser()
    const result = response.data
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}