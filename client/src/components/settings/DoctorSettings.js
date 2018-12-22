import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
// Components
import ProfileActions from "../app-bar/ProfileActions";
// Actions
import { updateDoctorSettings } from "../../actions/utilsActions";



const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  paperConfig: {
    width: "60vw",
    height: "100%",
    margin: "2em auto",
    padding: "2em"
  },
  marginInput: {
    margin: "1% 1% 1% 0"
  },
  headerConfig: {
    marginBottom: "3vh",
    marginTop: "3vh"
  },
  btn: {
    margin: "3em 0 1em 1em",
    width: "10vw"
  },
  halfWidth: {
    width: "48%"
  },
  quarterWidth: {
    width: "23.5%"
  },
  selectField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  timeWidth: {
    width: "7vw"
  }
});

const scheduleObj = {
    monday: {
        fromMonday: "",
        toMonday: ""

    },
    tuesday: {
        fromTuesday: "",
        toTuesday: ""

    },
    wednesday: {
        fromWednesday: "",
        toWednesday: ""

    },
    thursday: {
        fromThursday: "",
        toThursday: ""

    },
    friday: {
        fromFriday: "",
        toFriday: ""

    }
};

class DoctorSettings extends React.Component {
  state = {
    expanded: null,
    birthday: "",
    sex: "",
    workPhone: "",
    yearsOfPractice: "",
    achievements: "",
    clinicName: "",
    cabinet: "",
    specialty: "",
    address: {
      street: "",
      city: "",
      number: ""
    },
    university: {
      univCity: "",
      univName: "",
      yearOfEntry: "",
      yearOfOut: "",
      univSpecialty: ""
    },
    schedule: ""
  };

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onChangeSettings = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  onChangeAddress = ev => {
    this.setState({
      address: Object.assign({}, this.state.address, {
        [ev.target.name]: ev.target.value
      })
    });
  };

  onChangeUniversity = ev => {
    this.setState({
      university: Object.assign({}, this.state.university, {
        [ev.target.name]: ev.target.value
      })
    });
  };

  assignSchedule(targetName, targetValue, day) {
    return Object.assign({}, scheduleObj[day], { [targetName]: targetValue });
  }

  handleDateChange = ev => {
    let { name, value } = ev.target;
    let day = name.match(/[A-Z].+/g)[0].toLowerCase();
    switch (day) {
      case "monday":
        scheduleObj.monday = this.assignSchedule(name, value, day);
        break;
      case "tuesday":
        scheduleObj.tuesday = this.assignSchedule(name, value, day);
        break;
      case "wednesday":
        scheduleObj.wednesday = this.assignSchedule(name, value, day);
        break;
      case "thursday":
        scheduleObj.thursday = this.assignSchedule(name, value, day);
        break;
      case "friday":
        scheduleObj.friday = this.assignSchedule(name, value, day);
        break;
      default:
        throw new Error("Shit in switch on doctor settings");
    }
  };

  SetSchedule = () => {
    const { classes } = this.props;
    return (
      <div className="grid-schedule">
        <Typography variant="h6">Monday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          defaultValue="08:00"
          inputProps={{
            step: 300
          }}
          className={classes.timeWidth}
          name="fromMonday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          defaultValue="18:00"
          inputProps={{
            step: 300
          }}
          className={classes.timeWidth}
          name="toMonday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Tuesday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          defaultValue="08:00"
          inputProps={{
            step: 300
          }}
          name="fromTuesday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          defaultValue="18:00"
          inputProps={{
            step: 300
          }}
          name="toTuesday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Wednesday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          defaultValue="08:00"
          inputProps={{
            step: 300
          }}
          name="fromWednesday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          defaultValue="18:00"
          inputProps={{
            step: 300
          }}
          name="toWednesday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Thursday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          defaultValue="08:00"
          inputProps={{
            step: 300
          }}
          name="fromThursday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          defaultValue="18:00"
          inputProps={{
            step: 300
          }}
          name="toThursday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Friday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          defaultValue="08:00"
          inputProps={{
            step: 300
          }}
          name="fromFriday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          defaultValue="18:00"
          inputProps={{
            step: 300
          }}
          name="toFriday"
          onChange={this.handleDateChange}
          type="time"
        />
      </div>
    );
  };

  onSave = ev => {
    this.setState({ schedule: scheduleObj });
    this.props.updateDoctorSettings(this.state, this.props.auth.user.id);
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
      <ProfileActions userRole="Doctor" back={true} toLocation="/doctor/home" />
        <Paper elevation={5} className={classes.paperConfig}>
          <Typography variant="h4" className={classes.headerConfig}>
            General Settings
          </Typography>

          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleExpand("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Date of Birth</Typography>
              <Typography className={classes.secondaryHeading}>
                Please input your birthday, so we know your age
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="date"
                variant="outlined"
                defaultValue="2000-0 inputProps={{
          step: 300,
        }}1-01"
                name="birthday"
                onChange={this.onChangeSettings}
                className={classes.dateField}
                label="Birthday"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={this.handleExpand("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Sex</Typography>
              <Typography className={classes.secondaryHeading}>
                Set your sex
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="flex flex-center">
                <RadioGroup
                  aria-label="Gender"
                  name="sex"
                  value={this.state.sex}
                  onChange={this.onChangeSettings}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={this.handleExpand("panel3")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Alma-mater</Typography>
              <Typography className={classes.secondaryHeading}>
                Give us data about place where you were studying
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="flex flex-wrap">
              <TextField
                fullWidth
                name="univCity"
                onChange={this.onChangeUniversity}
                variant="outlined"
                label="Write the city where you were studying"
                placeholder="i.e. Kyiv, Kharkiv, Warsaw"
                className={`${classes.halfWidth} ${classes.marginInput}`}
              />
              <TextField
                fullWidth
                name="univName"
                onChange={this.onChangeUniversity}
                variant="outlined"
                label="Write name of your educational institution"
                placeholder="i.e. Bogomolets Nationsl Medical University"
                className={`${classes.halfWidth} ${classes.marginInput}`}
              />
              <TextField
                name="yearOfEntry"
                variant="outlined"
                type="number"
                label="Year of entry"
                onChange={this.onChangeUniversity}
                placeholder="i.e. 2006"
                className={`${classes.marginInput} ${classes.quarterWidth}`}
              />
              <TextField
                name="yearOfOut"
                variant="outlined"
                type="number"
                label="Graduation year"
                onChange={this.onChangeUniversity}
                placeholder="i.e. 2012"
                className={`${classes.marginInput} ${classes.quarterWidth}`}
              />
              <TextField
                name="univSpecialty"
                variant="outlined"
                label="Your specialty"
                onChange={this.onChangeUniversity}
                placeholder="i.e. surgery"
                className={`${classes.marginInput} ${classes.halfWidth}`}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel4"}
            onChange={this.handleExpand("panel4")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Years of practice
              </Typography>
              <Typography className={classes.secondaryHeading}>
                How many years of medical practice do you have?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Select
                value={this.state.yearsOfPractice}
                name="yearsOfPractice"
                onChange={this.onChangeSettings}
                variant="outlined"
                className={classes.selectField}
              >
                <MenuItem value={"0-3"}>0-3 years</MenuItem>
                <MenuItem value={"3-5"}>3-5 years</MenuItem>
                <MenuItem value={"5-10"}>5-10 years</MenuItem>
                <MenuItem value={"10-15"}>10-15 years</MenuItem>
                <MenuItem value={"15+"}>15+ years</MenuItem>
              </Select>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel5"}
            onChange={this.handleExpand("panel5")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Work Phone Number
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Give us your work phone number, so that patients can contact
                with you
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="flex flex-center">
                <Typography variant="h6">+38</Typography>
                <TextField
                  type="number"
                  className={classes.dateField}
                  label="Phone number"
                  name="workPhone"
                  InputProps={{ inputProps: { max: 10 } }}
                  onChange={this.onChangeSettings}
                  placeholder="(XXX)-123-45-67"
                  variant="outlined"
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel6"}
            onChange={this.handleExpand("panel6")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Special achievements
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Here you can write your special achievements you are proud of
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                name="achievements"
                multiline
                fullWidth
                onChange={this.onChangeSettings}
                label="Your contests, diplomasm certificates, etc"
                variant="outlined"
                placeholder="Separate with commas"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Typography variant="h4" className={classes.headerConfig}>
            About your current work organisation
          </Typography>

          <ExpansionPanel
            expanded={expanded === "panel7"}
            onChange={this.handleExpand("panel7")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Name</Typography>
              <Typography className={classes.secondaryHeading}>
                How full name of your job place?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                fullWidth
                name="clinicName"
                onChange={this.onChangeSettings}
                label="Full name"
                variant="outlined"
                placeholder="i.e. Kyiv City Clinical Hospital"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel8"}
            onChange={this.handleExpand("panel8")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Address</Typography>
              <Typography className={classes.secondaryHeading}>
                Please input address of your clinic
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                className={classes.marginInput}
                onChange={this.onChangeAddress}
                name="city"
                variant="outlined"
                label="City"
                placeholder="i.e. Kyiv, Kharkiv, Odessa"
              />

              <TextField
                type="text"
                fullWidth
                className={classes.marginInput}
                onChange={this.onChangeAddress}
                name="street"
                variant="outlined"
                label="Street"
                placeholder="i.e. Ivana Franka, Zelena"
              />

              <TextField
                type="text"
                fullWidth
                className={classes.marginInput}
                onChange={this.onChangeAddress}
                name="number"
                variant="outlined"
                label="Building number"
                placeholder="i.e. 46"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel9"}
            onChange={this.handleExpand("panel9")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Cabinet</Typography>
              <Typography className={classes.secondaryHeading}>
                № of your cabinet
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                name="cabinet"
                onChange={this.onChangeSettings}
                label="Number"
                variant="outlined"
                placeholder="i.e. 234"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel10"}
            onChange={this.handleExpand("panel10")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Specialty</Typography>
              <Typography className={classes.secondaryHeading}>
                Your current specialty
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                fullWidth
                name="specialty"
                onChange={this.onChangeSettings}
                label="Current specialty"
                variant="outlined"
                placeholder="i.e. Physician"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel11"}
            onChange={this.handleExpand("panel11")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Schedule</Typography>
              <Typography className={classes.secondaryHeading}>
                Set your working schedule
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{this.SetSchedule()}</ExpansionPanelDetails>
          </ExpansionPanel>

          <div className="flex flex-end">
            <Button
              variant="outlined"
              onClick={this.onCancel}
              color="secondary"
              className={classes.btn}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.onSave}
              color="secondary"
              className={classes.btn}
            >
              Save
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
};

export default connect(
  mapStateToProps,
  { updateDoctorSettings }
)(withStyles(styles)(DoctorSettings));