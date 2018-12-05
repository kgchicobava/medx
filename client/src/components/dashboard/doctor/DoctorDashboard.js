import React, { Component } from 'react';
import DashboardHeader from "../../layout/DashboardHeader";

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
