import React, { Component } from 'react';
import DashboardHeader from "../layout/DashboardHeader";

class DoctorDashboard extends Component {
  render() {
    return (
      <div>
          <DashboardHeader userRole="Doctor" />
      </div>
    )
  }
}

export default DoctorDashboard
