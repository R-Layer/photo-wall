import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/App.css";
import "./css/customBulma.css";

import { rootReducer } from "./redux/reducers/rootReducer";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Dashboard from "./components/Dashboard";
import EditUser from "./components/forms/EditUser";
import ControlPanel from "./components/forms/ControlPanel";
import ProvLog from "./components/ProvLog";

import { authProcess } from "./redux/types";
import jwt_decode from "jwt-decode";

const store = createStore(rootReducer, applyMiddleware(thunk));
if (localStorage.authToken) {
  store.dispatch({
    type: authProcess.LOGIN,
    loggedUser: { token: localStorage.authToken }
  });
  const { exp } = jwt_decode(localStorage.authToken);

  if (exp * 1000 < Date.now()) {
    store.dispatch({ type: authProcess.LOGOUT, message: "Session expired." });
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
            <Route exact path={"/control-panel"} component={ControlPanel} />
            <Route exact path={"/"} component={Dashboard} />
            <Route exact path={"/providerLog"} component={ProvLog} />
            <Switch>
              <PrivateRoute exact path={"/settings"} component={EditUser} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
