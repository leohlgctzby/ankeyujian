import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/actions";

import UserList from "../user-list/user-list";

class Nvshen extends Component {
  componentDidMount() {
    this.props.getUserList("nanshen");
  }

  render() {
    return (
      <div>
        <UserList userList={this.props.userList} />
      </div>
    );
  }
}

export default connect(
  state => ({ userList: state.userList }),
  { getUserList }
)(Nvshen);
