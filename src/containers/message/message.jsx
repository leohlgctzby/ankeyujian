import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

//对chatMsgs按chat_id进行分组,并得到每个组的LastMsg组成的数组
//1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id: lastMsg}
//2.得到所有lastMsg的数组，
//3.对数组进行排序（按时间create_time降序）
function getLastMsgs(chatMsgs) {
  //1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id: lastMsg}
  const lastMsgObjs = {};
  chatMsgs.forEach(msg => {
    //得到msg的聊天标识id
    const chatId = msg.chat_id;
    //获取已经保存的当前组的lastMsg
    const lastMsg = lastMsgObjs[chatId];
    if (!lastMsg) {
      //当前msg就是所在组的lastMsg
      lastMsgObjs[chatId] = msg;
    } else {
      //有
      //如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
    }
  });
  //2.得到所有lastMsg的数组
  const lastMsgs = Object.values(lastMsgObjs);
  //3.对数组进行排序（按时间create_time降序）
  lastMsgs.sort(function(m1, m2) {
    //如果结果小于0，就会将m1放在前面；结果为0，不变
    return m2.create_time - m1.create_time;
  });
  return lastMsgs;
}

class Message extends Component {
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    const lastMsgs = getLastMsgs(chatMsgs);

    return (
      <List style={{ marginTop: 50, marginBottom: 50 }}>
        {lastMsgs.map(msg => {
          //得到目标用户的id
          const targetId = msg.to === user._id ? msg.from : msg.to;
          const targetUser = users[targetId];
          return (
            <Item
              key={msg._id}
              extra={<Badge text={3} />}
              thumb={
                targetUser.header
                  ? require(`../../assets/images/${targetUser.header}.png`)
                  : null
              }
              arrow="horizontal"
              onClick={() => this.props.history.push(`/chat/${targetId}`)}
            >
              {msg.content}
              <Brief>{targetUser.username}</Brief>
            </Item>
          );
        })}
      </List>
    );
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {}
)(Message);
