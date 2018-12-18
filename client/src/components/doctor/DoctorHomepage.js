/*
Main cimponent that shows for doctor and contain all tabs and info
@NEED FOR RENAME
@imported in App
*/
import React, { Component } from 'react';
import ProfileActions from "../app-bar/ProfileActions";
import { withRouter } from "react-router-dom";
// Components
import DoctorTabs from './DoctorTabs';

class DoctorDashboard extends Component {
  render() {
    return (
      <div>
          <ProfileActions userRole="Doctor" />
          <DoctorTabs />
      </div>
    )
  }
}


export default withRouter(DoctorDashboard);
