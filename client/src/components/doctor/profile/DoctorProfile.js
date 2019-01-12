/*
Component that shows when you click on profile in My patients tab, as doctor
@imported in ThinCard
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import getAvatarInitials from "../../../helpers/getAvatarInitials";
import { colors } from "../../../helpers/palette";
// Components
import DoctorProfileTabs from "./DoctorProfileTabs";

const styles = theme => ({
	root: {
		// ...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: "80%",
		margin: "auto"
	},
	avatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		width: 150,
		fontSize: "50px",
		height: 150,
	},
	secondPaper: {
		width: "80%",
		margin: "1em auto"
	}
});

class DoctorProfile extends Component {
	render() {
	const { classes, user } = this.props;
	// console.log(user)
    let initials = getAvatarInitials(user.firstName, user.lastName).join("");
		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<div className="flex flex-center">
						<Avatar style={{backgroundColor: `${colors[user.color].bgc}`}} className={`${classes.avatar}`}>{initials}</Avatar>
						<Typography variant="h3">{`Dr. ${user.firstName} ${
							user.lastName
						}`}</Typography>
					</div>
				</Paper>
				<Paper className={classes.secondPaper} elevation={2}>
					<DoctorProfileTabs user={user} />
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(DoctorProfile);
