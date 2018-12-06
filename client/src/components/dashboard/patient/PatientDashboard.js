import React, { Component } from 'react'
import DashboardHeader from "../../layout/DashboardHeader";
import NavTabs2 from "./NavTabs2";

class PatientDashboard extends Component {
  render() {
    return (
      <div>
          <DashboardHeader userRole="Patient" />
          <NavTabs2 />
      </div>
    )
  }
}

export default PatientDashboard
