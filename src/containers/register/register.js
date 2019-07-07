import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from "antd-mobile";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from "../../components/logo/logo";
const ListItem = List.Item;

class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "nanshen"
  };

  //[name] 取变量的值
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  register = () => {
    // console.log(this.state);
    this.props.register(this.state)
  };

  //跳转到login
  toLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const { type } = this.state;
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
            <InputItem
              type="password"
              placeholder="请确认密码"
              onChange={val => {
                this.handleChange("password2", val);
              }}
            >
              确认密码:
            </InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "nanshen"}
                onChange={val => {
                  this.handleChange("type", "nanshen");
                }}
              >
                男神
              </Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "nvshen"}
                onChange={val => {
                  this.handleChange("type", "nvshen");
                }}
              >
                女神
              </Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;册
            </Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)
