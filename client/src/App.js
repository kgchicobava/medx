import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './sass/App.scss';
import RootPage from "./components/landing/RootPage";
import Login from "./components/register-and-login/Login";
import Register from "./components/register-and-login/Register";
import PrivateRoute from "./components/utils/PrivateRoute";
import DoctorHomepage from "./components/doctor/DoctorHomepage";
import PatientHomepage from "./components/patient/PatientHomepage";
import PatientSettings from "./components/settings/PatientSettings";

import store from "./store";
import {Provider} from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={RootPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
                <PrivateRoute exact path="/patient/home" component={PatientHomepage} />
                <PrivateRoute exact path="/doctor/home" component={DoctorHomepage} />
                <PrivateRoute exact path="/patient/home/settings" component={PatientSettings} />
          </Switch>
        </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
