/*
Component for doctor, that takes logic of all tabs for main page
@NEED FOR RENAME
@imported in DoctorDashboard
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// Components
import PatientsList from "./PatientsList";
import Stats from "./Stats";
import Calendar from "./Calendar";
import { connect } from "react-redux";
import { getDoctorAppointments } from "../../actions/calendarActions";
import omitEmpty from "omit-empty";
import isEmpty from "../../helpers/isempty";
import Loader from "../utils/Loader";

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
	}
});


class DoctorTabs extends Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};
	componentDidMount = () => {
		this.props.getDoctorAppointments(this.props.auth.user.id);
	};

	render() {
		const { classes, appointments } = this.props;
		const { value } = this.state;
		let content = null;
		if (isEmpty(omitEmpty(appointments))) {
			content = null;
		} else {
			content = appointments;
		}

		return (
			<div>
				<div className={classes.root}>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={this.handleChange}
							centered>
							<Tab label="Upcoming visits" />
							<Tab label="Stats" />
							<Tab label="Patients" />
							<Tab label="Moth" />
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							{content ? (
								<Calendar appointments={content} />
							) : (
								<Loader />
							)}
							}
						</TabContainer>
					)}
					{value === 1 && (
						<TabContainer>
							<Stats />
						</TabContainer>
					)}
					{value === 2 && (
						<TabContainer>
							<PatientsList />
						</TabContainer>
					)}
					{value === 3 && <TabContainer>Item Three</TabContainer>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	appointments: state.appointments,
	general: state.general
});

export default connect(
	mapStateToProps,
	{ getDoctorAppointments }
)(withStyles(styles)(DoctorTabs));
