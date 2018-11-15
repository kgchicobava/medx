import React, { Component } from "react";
import Header from "../layout/Header";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerDoctor, registerPatient } from "../../actions/authorizationAction";

import {
	ValidatorForm,
	TextValidator,
	SelectValidator
} from "react-material-ui-form-validator";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
	paper: {
		width: "50vw",
		margin: "3vh auto",
		paddingTop: "5vh"
	},
	layout: {
		display: "flex",
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	inputLayout: {
		width: "60%",
		margin: "3vh auto"
	},
	inputLayout2: {
		width: "100%",
		margin: "3vh auto"
	},
	margin: {
		width: "100%"
	},
	width: {
		width: "60%"
	},
	buttonLayout: {
		width: "48%",
		margin: "auto"
  },
  typographyPadding : {
    paddingTop: "3vh"
}
});

class Register extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			password2: "",
			typeOfUser: ""
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value
		});
	}

	onSubmit(ev) {
		const userData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			typeOfUser: this.state.typeOfUser
	};

	if(this.state.typeOfUser === "Doctor") {
		this.props.registerDoctor(userData, this.props.history);
	}
	if(this.state.typeOfUser === "Patient") {
		this.props.registerPatient(userData, this.props.history);
	}

	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isPasswordMatch", value => {
			if (value !== this.state.password) {
				return false;
			}
			return true;
		});

		ValidatorForm.addValidationRule("isEmailFree", value => {
			// !req to db for email
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Header headerLabel="Register" back={true} toLocation="/" />
				<Paper elevation={3} className={classes.paper}>
        <Typography className={classes.typographyPadding} variant="h4" align="center">
					Register
				</Typography>
					<ValidatorForm
						onSubmit={this.onSubmit}
						onError={errors => console.log(errors.length)}
					>
						<div className={classes.layout}>
							<TextValidator
								className={classes.inputLayout}
								label="First Name"
								onChange={this.onChange}
								name="firstName"
								value={this.state.firstName}
								placeholder="Enter your first name"
								validators={["required"]}
								errorMessages={["This field is required"]}
							/>

							<TextValidator
								className={classes.inputLayout}
								label="Last Name"
								onChange={this.onChange}
								name="lastName"
								value={this.state.lastName}
								placeholder="Enter your last name"
								validators={["required"]}
								errorMessages={["This field is required"]}
							/>

							<TextValidator
								className={classes.inputLayout}
								label="Email"
								onChange={this.onChange}
								name="email"
								value={this.state.email}
								placeholder="Enter your E-mail"
								validators={["required", "isEmail"]}
								errorMessages={[
									"this field is required",
									"email is not valid"
								]}
							/>

							<TextValidator
								className={classes.inputLayout}
								label="Password"
								onChange={this.onChange}
								name="password"
								type="password"
								value={this.state.password}
								placeholder="Enter your password"
								validators={["required", "minStringLength:5"]}
								errorMessages={[
									"this field is required",
									"This field should be at least 5 symbols long"
								]}
							/>

							<TextValidator
								className={classes.inputLayout}
								label="Confirm your password"
								onChange={this.onChange}
								name="password2"
								type="password"
								value={this.state.password2}
								placeholder="Confirm"
								validators={["required", "isPasswordMatch"]}
								errorMessages={[
									"this field is required",
									"Passwords do not match"
								]}
							/>

							<FormControl className={classes.inputLayout}>
								<Typography variant="p">
									Choose your role
								</Typography>
								<SelectValidator
									className={classes.inputLayout2}
									name="typeOfUser"
									onChange={this.onChange}
									value={this.state.typeOfUser}
									validators={["required"]}
									errorMessages={["this field is required"]}
								>
									<MenuItem value={"Doctor"}>
										I am a doctor
									</MenuItem>
									<MenuItem value={"Patient"}>
										I am a patient
									</MenuItem>
								</SelectValidator>
								<FormHelperText>
									You cannot change this in future
								</FormHelperText>
							</FormControl>
							<FormControl
								className={`${classes.inputLayout} ${
									classes.row
								}`}
							>
								<Button
									className={classes.buttonLayout}
									variant="contained"
									color="secondary"
									type="submit"
								>
									Register
								</Button>
								<Button
									className={classes.buttonLayout}
									variant="outlined"
									color="secondary"
									onClick={this.onSubmit}
									href="/"
								>
									Cancel
								</Button>
							</FormControl>
						</div>
					</ValidatorForm>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps, {registerDoctor, registerPatient})(withStyles(styles)(withRouter(Register)));
