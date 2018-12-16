/*
Main cimponent that shows for doctor and contain all tabs and info/ NEED FOR RENAME
@imported in App
*/
import React, { Component } from 'react';
import DashboardHeader from "../../layout/DashboardHeader";
// Components
import NavTabs from './NavTabs'

class DoctorDashboard extends Component {
  render() {
    return (
      <div>
          <DashboardHeader userRole="Doctor" />
          <NavTabs />
      </div>
    )
  }
}


export default DoctorDashboard;
