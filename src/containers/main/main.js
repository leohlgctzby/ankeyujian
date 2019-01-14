import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookie from "js-cookie"; //可以操作前端cookie的对象set() remove（)

import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";

import { getRedirectTo } from "../../utils";

class Main extends Component {

  componentDidMount() {
    //之前登录过（cookie中有userid），但是现在还没登录（redux管理的user中没有_id），发请求获取对应的user
    const userid = Cookies.get("userid");
    const { _id } = this.props.user;
    if(userid && !_id) {
      //发送异步请求，获取user
      console.log('发送ajax请求获取user')
    }
  }

  render() {
    //读取cookie中的userid
    const userid = Cookies.get("userid");
    //如果没有，自动重定向到登录界面
    if (!userid) {
      return <Redirect to="/login" />;
    }
    //如果有，读取redux中的user的状态
    const { user } = this.props;
    //如果user没有_id，返回一个null（不做任何显示）
    if (!user._id) {
      return null;
    } else {
      //如果user有_id，显示对应的界面
      //如果请求根路径，根据user的type和header，计算出重定向的路径，自动重定向
      let path = this.props.location.pathname;
      if (path === "/") {
        //得到一个重定向的路径
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path} />;
      }
    }

    //  //检查用户是否登录，如果没有，自动重定向到登录界面
    //  //在主路由做，相当于下面的所有路由都有了
    //  const {user} = this.props
    //   if(!user._id) {
    //     return <Redirect to='/login'/>
    //   }

    return (
      <div>
        <Switch>
          <Route path="/laobaninfo" component={LaobanInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route />
        </Switch>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Main);

// 1.实现自动登录
//   1.componentDidMount（）
//      之前登录过（cookie中有userid），但是现在还没登录（redux管理的user中没有_id），发请求获取对应的user
//   2.render（）
//    1） 如果cookie中没有userid，直接重定向到login界面
//    2）判断redux管理的user中是否有_id, 如果没有，暂时不做任何显示
//    3） 如果有，说明当前已经登录，显示对应的界面
//    4）如果请求的是根路径，根据user的type和header，计算出重定向的路径，自动重定向
