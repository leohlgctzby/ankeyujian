import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import {withRouter} from 'react-router-dom'
const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
  static proptypes = {
    userList: PropTypes.array.isRequired
  };

  render() {
    const { userList } = this.props;
    console.log(userList)
    return (
      <WingBlank style={{marginBottom: 50, marginTop: 50}}>
        {userList.map(user => (
          <div key={user._id}>
            <WhiteSpace />
            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
              <Header
                thumb={user.header ? require(`../../assets/images/${user.header}.png`) : null}
                extra={user.username}
              />
              <Body>
                <div>即时心情: {user.post}</div>
                {/*user.company ? <div>公司: {user.company}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null*/}
                <div>自我介绍: {user.info}</div>
              </Body>
            </Card>
          </div>
        ))}
      </WingBlank>
    );
  }
}

export default withRouter(UserList)