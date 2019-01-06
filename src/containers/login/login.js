import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from "antd-mobile";

import Logo from "../../components/logo/logo";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  //[name] 取变量的值
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  login = () => {
    console.log(this.state);
  };

  //跳转到register
  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem
              placeholder="请输入用户名"
              onChange={val => {
                this.handleChange("username", val);
              }}
            >
              用户名:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={val => {
                this.handleChange("password", val);
              }}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
