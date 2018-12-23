/*
Component that will be shown in My doctors tab for patients, looks like card
@imported NOWHERE
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import DateIcon from "@material-ui/icons/DateRange";
import PhoneIcon from "@material-ui/icons/Phone";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import getRandomMaterialColor from "../../helpers/getRandomMaterialColor";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PlaceIcon from "@material-ui/icons/Place";
import StarIcon from "@material-ui/icons/Star";
import HealingIcon from "@material-ui/icons/Healing";
import CabinetIcon from "@material-ui/icons/MeetingRoom";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import getAvatarInitials from "../../helpers/getAvatarInitials";
// components
import DoctorProfile from "../doctor/profile/DoctorProfile";


const styles = {
  card: {
    width: "25vw"
  },
  media: {
    height: 100
    // backgroundColor: "#333"
  },
  avatar: {
    margin: "0 10px 10px 0"
  },
  orangeAvatar: {
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  typoMargin: {
    marginBottom: "-6px",
    marginLeft: "1em"
  },
  appBar: {
    position: 'relative',
  },
};

class UserCard extends Component {
  state = {
    profileOpen: false
  }

  closeProfile = () => {
    this.setState({ profileOpen: false });
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

  renderSwitch(arg) {
    switch (arg) {
      case "0-3":
        return "Up to 3 years of med practice";
      case "3-5":
        return "5 years of med practice";
      case "5-10":
        return "Almost 10 years of med practice";
      case "10-15":
        return "15 years of med practice";
      case "15+":
        return "More than 15 years of med practice";
      default:
        return "N/A";
    }
  }

  render() {
    const { classes, user } = this.props;
    let birthday, pickedDate, recievedDate;
    let initials = getAvatarInitials(user.firstName, user.lastName).join("");
    if (user.settings.birthday) {
      pickedDate = user.settings.birthday.split("-");
      recievedDate = new Date(...pickedDate);
      birthday = `${recievedDate.getDate()}.${recievedDate.getMonth() +
        1}.${recievedDate.getFullYear()} (${this.calculateAge(
        recievedDate
      )} years)`;
    } else birthday = "N/A";
    console.log(user);
    return (
      <div>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={`${classes.media} deepOrange`} src="none" />
            <CardContent>
              {/* Title */}
              <div className="flex flex-center">
                <Avatar
                  sizes="large"
                  className={`${classes.orangeAvatar} ${classes.bigAvatar} ${
                    classes.avatar
                  }`}>
                  {initials}
                </Avatar>
                <Typography variant="h5" component="h2">
                  {`Dr. ${user.firstName} ${user.lastName}`}
                </Typography>
              </div>
              {/* Clinic name */}
              <div className="flex flex-center creditsPos">
                <LocalHospitalIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {`${user.settings.clinicName || "N/A"}`}
                </Typography>
              </div>
              {/* Clinic address */}
              <div className="flex flex-center creditsPos">
                <PlaceIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {`${user.settings.address.city || "N/A"}, ${user.settings
                    .address.street || "N/A"} ${user.settings.address.number ||
                    "N/A"}`}
                </Typography>
              </div>
              {/* Cabinet */}
              <div className="flex flex-center creditsPos">
                <CabinetIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {user.settings.cabinet
                    ? `Cabinet #${user.settings.cabinet}`
                    : "N/A"}
                </Typography>
              </div>
              {/* Date of birth */}
              <div className="flex flex-center creditsPos">
                <DateIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {birthday}
                </Typography>
              </div>
              {/* Phone number */}
              <div className="flex flex-center creditsPos">
                <PhoneIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {user.settings.workPhone || "N/A"}
                </Typography>
              </div>
              {/* Specialty */}
              <div className="flex flex-center creditsPos">
                <HealingIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {`${user.settings.specialty || "N/A"}`}
                </Typography>
              </div>
              {/* Years of practice */}
              <div className="flex flex-center creditsPos">
                <StarIcon />
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.typoMargin}>
                  {this.renderSwitch(user.settings.yearsOfPractice)}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>Unsubscribe</Button>
            <Button
              onClick={() => {
                this.setState({ profileOpen: true });
              }}>
              Show profile
            </Button>
          </CardActions>
        </Card>
        <Dialog
          fullScreen
          open={this.state.profileOpen}
          onClose={this.closeProfile}
          TransitionComponent={this.Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.closeProfile}
                aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {`${this.props.user.firstName} ${this.props.user.lastName}`}
              </Typography>
            </Toolbar>
          </AppBar>
          <DoctorProfile user={this.props.user} />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(UserCard);
