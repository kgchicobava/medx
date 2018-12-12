import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import { updatePatientSettings } from "../../actions/utilsActions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DashboardHeader from "../layout/DashboardHeader";



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
  dateField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  headerConfig: {
    marginBottom: "3vh",
    marginTop: "3vh"
  },
  btn: {
    margin: "3em 0 1em 1em",
    width: "10vw"
  }
});

class PatientSettings extends React.Component {
  state = {
    expanded: null,
    address: {
      street: "",
      city: "",
      number: ""
    },
    birthday: "",
    sex: "",
    email: "",
    work: "",
    maritalStatus: "",
    emergency: {
      fName: "",
      lName: "",
      relation: "",
      phoneNumber: ""
    },
    phone: "",
    allergies: "",
    medAllergies: "",
    injuries: "",
    operations: "",
    currMeds: "",
    height: "",
    weight: ""
  };

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onAddress = (ev) => {
    this.setState({
      address: Object.assign({}, this.state.address, {[ev.target.name]: ev.target.value})
    })
  }

  onEmergency = (ev) => {
    this.setState({
      emergency: Object.assign({}, this.state.emergency, {[ev.target.name]: ev.target.value})
    })
  }

  onTest = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  onSave = (ev) => {
    this.props.updatePatientSettings(this.state)
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
      <DashboardHeader userRole="Patient" back={true} toLocation="/patient/home" />
        <Paper elevation={5} className={classes.paperConfig}>
          <Typography variant="h4" className={classes.headerConfig}>
            General Settings
          </Typography>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleExpand("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Address</Typography>
              <Typography className={classes.secondaryHeading}>
                Please input your address
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                onChange={this.onAddress}
                name="city"
                variant="outlined"
                label="Your city"
                placeholder="i.e. Kyiv, Kharkiv, Odessa"
              />

              <TextField
                type="text"
                onChange={this.onAddress}
                name="street"
                variant="outlined"
                label="Your street"
                placeholder="i.e. Ivana Franka, Zelena"
              />

              <TextField
                type="text"
                onChange={this.onAddress}
                name="number"
                variant="outlined"
                label="Your house number"
                placeholder="i.e. 46"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={this.handleExpand("panel2")}
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
                defaultValue="2000-01-01"
                name="birthday"
                onChange={this.onTest}
                className={classes.dateField}
                label="Birthday"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={this.handleExpand("panel3")}
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
                  onChange={this.onTest}
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
            expanded={expanded === "panel4"}
            onChange={this.handleExpand("panel4")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>E-mail</Typography>
              <Typography className={classes.secondaryHeading}>
                Please input your e-mail, so we can send for you different data
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="email"
                fullWidth
                name="email"
                onChange={this.onTest}
                variant="outlined"
                label="Your E-mail"
                placeholder="example@example.com"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel5"}
            onChange={this.handleExpand("panel5")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Marital Status
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Tell us about your maritial status
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Select
                value={this.state.maritalStatus}
                name="maritalStatus"
                onChange={this.onTest}
                variant="outlined"
                className={classes.dateField}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Single"}>Single</MenuItem>
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Divorced"}>Divorced</MenuItem>
                <MenuItem value={"Widowed"}>Widowed</MenuItem>
              </Select>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel6"}
            onChange={this.handleExpand("panel6")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Work</Typography>
              <Typography className={classes.secondaryHeading}>
                If you want to give us additional data, you can input your job
                place
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="work"
                onChange={this.onTest}
                variant="outlined"
                label="Your Job"
                placeholder="i.e main engineer in Mercedes-benz"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel7"}
            onChange={this.handleExpand("panel7")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Phone Number</Typography>
              <Typography className={classes.secondaryHeading}>
                Give us your phone number, so that doctor can contact with you
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="flex flex-center">
                <Typography variant="h6">+38</Typography>
                <TextField
                  type="number"
                  className={classes.dateField}
                  label="Phone number"
                  name="phone"
                  InputProps={{ inputProps: { max: 10 } }}
                  onChange={this.onTest}
                  placeholder="(XXX)-123-45-67"
                  variant="outlined"
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel8"}
            onChange={this.handleExpand("panel8")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Height (cm)</Typography>
              <Typography className={classes.secondaryHeading}>
                Give us information about your height
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="number"
                className={classes.dateField}
                placeholder="Your height in cm"
                name="height"
                onChange={this.onTest}
                variant="outlined"
                inputProps={{ min: "0", max: "300" }}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel9"}
            onChange={this.handleExpand("panel9")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Weight (kg)</Typography>
              <Typography className={classes.secondaryHeading}>
                Give us information about your weight
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="number"
                className={classes.dateField}
                placeholder="Your weight in kg"
                variant="outlined"
                name="weight"
                onChange={this.onTest}
                inputProps={{ min: "0", max: "300" }}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel10"}
            onChange={this.handleExpand("panel10")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                In case of emergency
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Give us information about your trusted contact
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                name="fName"
                onChange={this.onEmergency}
                className={classes.dateField}
                placeholder="First name"
                variant="outlined"
              />
              <TextField
                type="text"
                name="lName"
                onChange={this.onEmergency}
                className={classes.dateField}
                placeholder="Last Name"
                variant="outlined"
              />
              <TextField
                type="text"
                name="relation"
                onChange={this.onEmergency}
                className={classes.dateField}
                placeholder="Relationship"
                variant="outlined"
              />
              <TextField
                type="number"
                name="phoneNumber"
                onChange={this.onEmergency}
                className={classes.dateField}
                placeholder="Phone number"
                variant="outlined"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Typography variant="h4" className={classes.headerConfig}>
            Medical questions
          </Typography>

          <ExpansionPanel
            expanded={expanded === "panel11"}
            onChange={this.handleExpand("panel11")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Allergies</Typography>
              <Typography className={classes.secondaryHeading}>
                What allergies do you have? (fruits, pets, plants, etc)
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="allergies"
                onChange={this.onTest}
                variant="outlined"
                label="Your allergies"
                placeholder="i.e chocolate, dogs, lemons"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel12"}
            onChange={this.handleExpand("panel12")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Medicine allergies
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Do you have some allergies on medicines?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="medAllergies"
                onChange={this.onTest}
                variant="outlined"
                label="Your medicine allergies"
                placeholder="i.e amoxicillin, ampicillin, penicillin"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel13"}
            onChange={this.handleExpand("panel13")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Injuries</Typography>
              <Typography className={classes.secondaryHeading}>
                Did you had some injuries in the past?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="injuries"
                onChange={this.onTest}
                variant="outlined"
                label="Your injuries"
                placeholder="i.e broke arm"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel14"}
            onChange={this.handleExpand("panel14")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Operations</Typography>
              <Typography className={classes.secondaryHeading}>
                Did you had some operations in the past?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="operations"
                onChange={this.onTest}
                variant="outlined"
                label="Your past operations"
                placeholder="i.e plastic operations, appendix"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel15"}
            onChange={this.handleExpand("panel15")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Currently meds
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Taking any medications, currently?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                type="text"
                fullWidth
                name="currMeds"
                onChange={this.onTest}
                variant="outlined"
                label="Are you taking some medicines right now?"
                placeholder="if no, leave blank"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <div className="flex flex-end">
            <Button variant="outlined" onClick={this.onCancel} color="secondary" className={classes.btn}>
              Cancel
            </Button>
            <Button variant="contained" onClick={this.onSave} color="secondary" className={classes.btn}>
              Save
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {state};
};

export default connect(
  mapStateToProps,
  { updatePatientSettings }
)(withStyles(styles)(PatientSettings));