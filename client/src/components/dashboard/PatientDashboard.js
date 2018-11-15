import React, { Component } from 'react'

import DashboardHeader from "../layout/DashboardHeader";

class PatientDashboard extends Component {
  render() {
    return (
      <div>
          <DashboardHeader userRole="Patient" />
      </div>
    )
  }
}

export default PatientDashboard
