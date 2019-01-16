/*
对话聊天的路由组件
*/
import React, { Component } from "react";
import { NavBar, List, InputItem } from "antd-mobile";
const Item = List.Item;
export default class Chat extends Component {
  render() {
    return (
      <div id="chat-page">
        <NavBar>aa</NavBar>
        <List>
          <Item thumb={require("../../assets/images/头像1.png")}>你好2</Item>
          <Item className="chat-me" extra="我">
            很好
          </Item>
          <Item className="chat-me" extra="我">
            很好2
          </Item>
        </List>
        <div className="am-tab-bar">
          <InputItem placeholder="请输入" extra={<span>发送</span>} />
        </div>
      </div>
    );
  }
}
