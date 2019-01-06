import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";

ReactDom.render(
  <HashRouter>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
