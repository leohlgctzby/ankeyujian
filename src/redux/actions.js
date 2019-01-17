import io from "socket.io-client";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from "./action-types";

//单例对象
// 1.创建对象之前：判断对象是否已经存在，只有不存在才去创建
// 2.创建对象之后：保存对象
function initIO() {
  // 1.创建对象之前：判断对象是否已经存在，只有不存在才去创建
  if (!io.socket) {
    //连接服务器，得到与服务器的连接对象
    io.socket = io("ws://localhost:4000");// 2.创建对象之后：保存对象
    // 绑定监听，接收服务器发送的消息
    io.socket.on("receiveMsg", function(chatMsg) {
      console.log("客户端接收到服务器发送的消息", chatMsg);
    });
  }
}

//发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log("客户端向服务器发消息", { from, to, content });
    initIO()
    //发消息
    io.socket.emit('sendMsg', { from, to, content })
  };
};

//授权成功的同步action
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user });
//错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg });
//接收用户的同步action
const receiveUser = user => ({ type: RECEIVE_USER, data: user });
//重置用户的同步action
export const resetUser = msg => ({ type: RESET_USER, data: msg });
//接收用户列表的同步action
export const receiveUserList = userList => ({
  type: RECEIVE_USER_LIST,
  data: userList
});

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
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

//获取用户列表的异步action
export const getUserList = type => {
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    console.log(result);
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};
