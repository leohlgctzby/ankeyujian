import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";

import { updateUser } from "../../redux/actions";

class NvshenInfo extends Component {
  state = {
    header: "",
    post: "",
    info: ""
  };

  setHeader = header => {
    this.setState({
      header
    });
  };

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    //如果信息已经完善，自动重定向到对应的主界面
    const { header, type } = this.props.user;
    if (header) {
      //说明信息已经完善
      const path = type === "nvshen" ? "/nvshen" : "/nanshen";
      return <Redirect to={path} />;
    }
    return (
      <div>
        <NavBar>女神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem
          placeholder="请输入即时心情:"
          onChange={val => {
            this.handleChange("post", val);
          }}
        >
          即时心情
        </InputItem>
        <TextareaItem
          title="自我介绍:"
          rows={3}
          onChange={val => {
            this.handleChange("info", val);
          }}
        />
        <Button type="primary" onClick={this.save}>
          保&nbsp;&nbsp;&nbsp;存
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { updateUser }
)(NvshenInfo);
