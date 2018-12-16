import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import PatientProfileTabs from "./PatientProfileTabs";

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "80%",
    margin: "auto"
  },
  purpleAvatar: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: "#fff",
    width: 150,
    fontSize: "50px",
    height: 150,
    backgroundColor: deepPurple[500]
  },
  secondPaper: {
    width: "80%",
    margin: "1em auto"
  }
});

class PatientProfile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className="flex flex-center">
            <Avatar className={classes.purpleAvatar}>OP</Avatar>
            <Typography variant="h3">Doug DeMuro</Typography>
          </div>
        </Paper>
        <Paper className={classes.secondPaper} elevation={2}>
          <PatientProfileTabs />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(PatientProfile);
