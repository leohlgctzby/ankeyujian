import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";

import './assets/css/index.less'

//import './test/socketio_test'

ReactDom.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={Main} />
      </Switch>
    </HashRouter>
  </Provider>
  ),document.getElementById("root")
);
