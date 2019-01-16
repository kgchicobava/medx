import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./sass/App.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";
// Components
import RootPage from "./components/landing/RootPage";
import Login from "./components/register-and-login/Login";
import Register from "./components/register-and-login/Register";

import PrivateDoctorRoute from "./components/utils/PrivateDoctorRoute";
import PrivatePatientRoute from "./components/utils/PrivatePatientRoute";

import DoctorHomepage from "./components/doctor/DoctorHomepage";
import PatientHomepage from "./components/patient/PatientHomepage";
import PatientSettings from "./components/settings/PatientSettings";
import DoctorSettings from "./components/settings/DoctorSettings";
// Actions
import { setCurrentUser } from "./actions/authorizationAction";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}

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
							<PrivatePatientRoute
								exact
								path="/patient/home"
								component={PatientHomepage}
							/>
							<PrivateDoctorRoute
								exact
								path="/doctor/home"
								component={DoctorHomepage}
							/>
							<PrivatePatientRoute
								exact
								path="/patient/home/settings"
								component={PatientSettings}
							/>
							<PrivateDoctorRoute
								exact
								path="/doctor/home/settings"
								component={DoctorSettings}
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
