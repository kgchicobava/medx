import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './sass/App.scss';
import HomePage from "./components/mainpage/HomePage";
import Login from "./components/register-and-login/Login";
import Register from "./components/register-and-login/Register";
import PrivateRoute from "./components/tools/PrivateRoute";
import DoctorDashboard from "./components/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "./components/dashboard/patient/PatientDashboard";


import store from "./store";
import {Provider} from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
                <PrivateRoute exact path="/patient/home" component={PatientDashboard} />
                <PrivateRoute exact path="/doctor/home" component={DoctorDashboard} />
          </Switch>
        </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
