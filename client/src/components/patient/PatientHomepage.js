/*
	Main component for patient UI, contains tabs
	@imported in App
*/
import React, { Component } from "react";
// Actions
import ProfileActions from "../app-bar/ProfileActions";
// Component
import PatientTabs from "./PatientTabs";

class PatientDashboard extends Component {
	render() {
		return (
			<div>
				<ProfileActions userRole="Patient" />
				<PatientTabs />
			</div>
		);
	}
}

export default PatientDashboard;
