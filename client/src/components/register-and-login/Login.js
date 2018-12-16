/*
Login page
@Make validation and error messages
@imported in App 
*/
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
// Components
import Header from "../layout/Header";
// Actions
import { loginUser } from "../../actions/authorizationAction";

const styles = theme => ({
  width: {
    width: "25vw"
  },
  margin: {
    margin: "2vh auto"
  },
  paperWidth: {
    width: "30vw",
    height: "50vh",
    margin: "10vh auto"
  },
  typographyPadding: {
    paddingTop: "3vh"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.user.typeOfUser === "Doctor") {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/doctor/home");
      }
    }
    if (this.props.auth.user.typeOfUser === "Patient") {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/patient/home");
      }
    }
  }

  onSubmit(ev) {
    ev.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.user.typeOfUser === "Patient") {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/patient/home");
      }
    }
    if (nextProps.auth.user.typeOfUser === "Doctor") {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/doctor/home");
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header headerLabel={"Login"} back={true} toLocation="/" />

        <Paper elevation={3} className={classes.paperWidth}>
          <Typography
            className={classes.typographyPadding}
            variant="h4"
            align="center"
          >
            Log In
          </Typography>
          <form onSubmit={this.onSubmit}>
            <div className="login-container">
              <FormControl>
                <InputLabel>Enter your E-mail</InputLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="E-Mail"
                  className={`${classes.width} ${classes.margin}`}
                  required={true}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Enter your password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`${classes.width} ${classes.margin}`}
                  required={true}
                  onChange={this.onChange}
                />
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                className={`${classes.width} ${classes.margin}`}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
