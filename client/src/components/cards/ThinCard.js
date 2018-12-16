/*
Component, that show in My patients tab for doctor, thin and long, opens Patient profile component
@imported in PatientsTab
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import PatientProfile from "./PatientProfile";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
    margin: "auto",
    width: "85%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: ".5em"
  },
  showBtn: {
    marginLeft: "auto"
  },
  appBar: {
    position: 'relative',
  },
});

class ThinCard extends Component {
  state= {
    open: false
  }
  infoItem = (icon, text) => {
    return (
      <div className="flex flex-center infoItemMargin">
        {icon}
        <Typography variant="subtitle1">{text ? text : "N/A"}</Typography>
      </div>
    );
  };

  closeProfile = () => {
    this.setState({ open: false });
  };

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    const { classes, user } = this.props;
    let pickedDate = user.settings.birthday.split("-");
    let recievedDate = new Date(...pickedDate);
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className="flex flex-center infoItemMargin">
            <AccountCircleIcon className="iconMargin" fontSize="large" />
            <Typography variant="h6">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </div>
          {this.infoItem(
            <HomeIcon className="iconMargin" />,
            `${user.settings.address.city}, ${user.settings.address.street} ${
              user.settings.address.number
            }`
          )}
          {this.infoItem(
            <EventIcon className="iconMargin" />,
            `${recievedDate.getDate()}.${recievedDate.getMonth() +
              1}.${recievedDate.getFullYear()} (${this.calculateAge(
              recievedDate
            )} years)`
          )}
          {this.infoItem(
            <PhoneIcon className="iconMargin" />,
            `+38${user.settings.phone}`
          )}
          {this.infoItem(<MailIcon className="iconMargin" />, `${user.email}`)}
          {this.infoItem(
            <WorkIcon className="iconMargin" />,
            `${user.settings.work}`
          )}
          <Button
            className={classes.showBtn}
            variant="outlined"
            color="secondary"
            onClick={() => this.setState({open: true})}
          >
            Show
          </Button>
        </Paper>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.closeProfile}
          TransitionComponent={this.Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.closeProfile} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Sound
              </Typography>
            </Toolbar>
          </AppBar>
          <PatientProfile user={this.props.user} />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ThinCard);
