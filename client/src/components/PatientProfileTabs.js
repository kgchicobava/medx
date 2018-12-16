import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EventIcon from "@material-ui/icons/Event";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ECard from "./ECard";
import Recepies from "./Recepies";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  infoItems: {
    marginLeft: ".5em",
    fontSize: "1.3em"
  }
});

const userdata = {
  address: {
    street: "Ivana Franka",
    city: "Monte Carlo",
    number: "58"
  },
  birthday: "14.5.2018",
  sex: "Male",
  email: "example@test.com",
  work: "Tesla",
  maritalStatus: "Married",
  emergency: {
    fName: "Lisa",
    lName: "Simpson",
    relation: "Sister",
    phoneNumber: "+358412054"
  },
  phone: "+365521564",
  allergies: "Lemon, apples",
  medAllergies: "Peniciline",
  injuries: "none",
  operations: "none",
  currMeds: "Decasanum",
  height: "189",
  weight: "88"
};

class PatientProfileTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  generalInfo(user, classes) {
    return (
      <div className="profileGrid">
        <div className="flex flex-center">
          <HomeIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.address.city
          }, ${user.address.street} ${user.address.number}`}</Typography>
        </div>
        <div className="flex flex-center">
          <PhoneIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.phone
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <EventIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.birthday
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <FaceIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.sex
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <MailIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.email
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <WorkIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.work
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <ChildFriendlyIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.maritalStatus
          }`}</Typography>
        </div>
        <div className="flex flex-center">
          <AccessibilityIcon color="primary" fontSize="large" />
          <Typography className={classes.infoItems} variant="subtitle1">{`${
            user.height
          }cm/${user.weight}kg`}</Typography>
        </div>
        <ExpansionPanel className="emergencyPanel">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              className={classes.infoItems}
              variant="subtitle1"
              color="red"
            >
              In case of emergency!
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="subtitle1">
              {`Call contact ${user.emergency.fName} ${
                user.emergency.lName
              } which is ${user.emergency.relation}, Phone number: ${
                user.emergency.phoneNumber
              }`}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  medicalQuestions(user) {
    return (
      <div>
        <div className="">
          <Typography variant="h5">{`Allergies: ${user.allergies}`}</Typography>
          <Typography variant="h5">
            {`Allergies on medicines: ${user.medAllergies}`}
          </Typography>
          <Typography variant="h5">{`Injuries: ${user.injuries}`}</Typography>
          <Typography variant="h5">{`Past operations: ${user.operations}`}</Typography>
          <Typography variant="h5">{`Current medicines: ${user.currMeds}`}</Typography>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="white" elevation={0}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              centered
              fullWidth={true}
            >
              <Tab label="General" />
              <Tab label="Medical questions" />
              <Tab label="E-card" />
              <Tab label="Recepies" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>{this.generalInfo(userdata, classes)}</TabContainer>
          )}
          {value === 1 && (
            <TabContainer>{this.medicalQuestions(userdata)}</TabContainer>
          )}
          {value === 2 && <TabContainer><ECard /></TabContainer>}
          {value === 3 && <TabContainer><Recepies /></TabContainer>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PatientProfileTabs);
