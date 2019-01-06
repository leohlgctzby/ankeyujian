import React, { Component } from "react";
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile';

import Logo from '../../components/logo/logo';
const ListItem = List.Item;

export default class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'laoban',
  }

  //[name] 取变量的值
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  register = () => {
    console.log(this.state);
  }

  //跳转到login
  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const { type } = this.state;
  return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
          <WhiteSpace/>
            <InputItem onChange={val => {this.handleChange('username', val) }}>用户名:</InputItem> 
            <WhiteSpace/>
            <InputItem type='password' onChange={val => {this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem> 
            <WhiteSpace/>
            <InputItem type='password' onChange={val => {this.handleChange('password2', val) }}>确认密码:</InputItem> 
            <WhiteSpace/>
              <ListItem>
                <span>用户类型:</span>
                &nbsp;&nbsp;&nbsp;
                <Radio checked={type==="laoban"} onChange={val => {this.handleChange('type', 'laoban')} }>老板</Radio>
                &nbsp;&nbsp;&nbsp;
                <Radio checked={type==="dashen"} onChange={val => {this.handleChange('type', 'dashen')} }>大神</Radio>
              </ListItem>
              <WhiteSpace/>
              <Button type='primary' onClick={this.register}> 注&nbsp;&nbsp;&nbsp;册</Button>
              <WhiteSpace/>
              <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
      );
  }
}
