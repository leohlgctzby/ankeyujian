import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from "antd-mobile";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from "../../components/logo/logo";

class Login extends Component {
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
    this.props.login(this.state)
    console.log(this.state);
  };

  //跳转到register
  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {

    const { msg, redirectTo } = this.props.user
    if(redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div>
        <NavBar>你&nbsp;的&nbsp;遇&nbsp;见</NavBar>
        <Logo />
        <WingBlank>
          <List>
           {msg ? <div className='error-msg'>{msg}</div> : null }
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

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)
