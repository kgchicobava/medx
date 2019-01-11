import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: "#1e4de973",
		color: theme.palette.common.white,
		fontSize: 18
	},
	body: {
		fontSize: 20
	}
}))(TableCell);

const styles = theme => ({
	root: {
		width: "100%",
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	}
});

let id = 0;
function createData(day, from, to) {
	id += 1;
	return { id, day, from, to };
}

function DoctorSchedule(props) {
	const { classes, timeTable } = props;
	const rows = [
		createData(
			"Monday",
			timeTable.monday.fromMonday,
			timeTable.monday.toMonday
		),
		createData(
			"Tuesday",
			timeTable.tuesday.fromTuesday,
			timeTable.tuesday.toTuesday
		),
		createData(
			"Wednesday",
			timeTable.wednesday.fromWednesday,
			timeTable.wednesday.toWednesday
		),
		createData(
			"Thursday",
			timeTable.thursday.fromThursday,
			timeTable.thursday.toThursday
		),
		createData(
			"Friday",
			timeTable.friday.fromFriday,
			timeTable.friday.toFriday
		)
	];

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<CustomTableCell>Day of week</CustomTableCell>
						<CustomTableCell align="right">
							Start of working day
						</CustomTableCell>
						<CustomTableCell align="right">
							End of working day
						</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => {
						return (
							<TableRow key={row.id}>
								<CustomTableCell component="th" scope="row">
									{row.day}
								</CustomTableCell>
								<CustomTableCell align="right">
									{row.from}
								</CustomTableCell>
								<CustomTableCell align="right">
									{row.to}
								</CustomTableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

DoctorSchedule.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoctorSchedule);
