/*
Component for doctor, that takes logic of all tabs for main page
@NEED FOR RENAME
@imported in DoctorDashboard
*/
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// Components
import PatientsList from './PatientsList';
import Stats from "./Stats";
import Calendar from "./Calendar";

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  const calendarProps = {
    monday: [
      // { nombre: 'Gustavo', hora_inicio: '08:00', hora_termino: '09:00' },
      { name: 'Gustavo', time_start: '08:00', time_end: '09:00' },
      { name: 'Felipe', time_start: '09:30', time_end: '11:00' },
      { name: 'Cony', time_start: '18:00', time_end: '18:30' }
    ],
    tuesday: [{ name: 'Gustavo', time_start: '08:00', time_end: '09:00' }],
    wednesday: [
      { name: 'Nicole', time_start: '11:30', time_end: '14:00' }
    ],
    thursday: [
      { name: 'Alejandro', time_start: '00:00', time_end: '00:30' }
    ],
    friday: []
  };

  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });

  const calendarProps = {
  monday: [
    // { nombre: 'Gustavo', hora_inicio: '08:00', hora_termino: '09:00' },
    { name: 'Gustavo', time_start: '08:00', time_end: '09:00' },
    { name: 'Felipe', time_start: '09:30', time_end: '11:00' },
    { name: 'Cony', time_start: '18:00', time_end: '18:30' }
  ],
  tuesday: [{ name: 'Gustavo', time_start: '08:00', time_end: '09:00' }],
  wednesday: [
  	{ name: 'Nicole', time_start: '11:30', time_end: '14:00' }
  ],
  thursday: [
  	{ name: 'Alejandro', time_start: '00:00', time_end: '00:30' }
  ],
  friday: []
};

class DoctorTabs extends Component {
    state = {
        value: 0,
      };

      handleChange = (event, value) => {
        this.setState({ value });
      };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Stats" />
            <Tab label="Patients" />
            <Tab label="Upcoming visits" />
            <Tab label="Moth" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Stats /></TabContainer>}
        {value === 1 && <TabContainer><PatientsList /></TabContainer>}
<<<<<<< HEAD
        {value === 2 && <TabContainer><Calendar appointments={calendarProps}/></TabContainer>}
=======
        {value === 2 && <TabContainer><Calendar appointments={calendarProps} /></TabContainer>}
>>>>>>> 0ba4f8c1bfd92dce139562db63198c8c3e45f6a6
        {value === 3 && <TabContainer>Item Three</TabContainer>}
      </div>
      </div>
    )
  }
}

export default withStyles(styles)(DoctorTabs);