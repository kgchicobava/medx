import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import getAvailableTime from "../../../helpers/getAvailableTime";
import startOfWeek from "../../../helpers/startOfWeek";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import getEndTime from "../../../helpers/getEndTime";
import { appointmentAdd } from "../../../actions/calendarActions";

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
    },
    weekday: {
        width: "40%"
    }
});

const week = startOfWeek(new Date());
let HOURS = null;
// console.log(getAvailableTime())
class SetMeeting extends Component {
    state = {
        day: "",
        time_start: "",
        time_end: "",
        name: `${this.props.auth.user.firstName} ${this.props.auth.user.lastName}`,
        allowed: false
    }

    formatWeekDay = (day, date) => {
        return `${day} (${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()})`
    }

    onSelectDay = (ev) => {
        this.setState({day: ev.target.value, allowed: true});
        HOURS = getAvailableTime(this.props.user.settings.schedule[ev.target.value.toLowerCase()], this.props.user.appointments[ev.target.value.toLowerCase()], ev.target.value.toLowerCase());
    }

    onHourSet = (ev) => {
        this.setState({time_start: ev.target.value, time_end: getEndTime(ev.target.value)})
    }

    registerMeet = (ev) => {
        let appointment = {name: this.state.name, time_start: this.state.time_start, time_end: this.state.time_end}
        this.props.appointmentAdd(appointment, this.state.day.toLowerCase(), this.props.user._id, this.props.auth.user.id);
    }


	render() {
		const { classes } = this.props;
		// console.log(appointments, schedule);
		return (
			<div>
				<Select
					value={this.state.day}
                    name="weekdays"
                    autoWidth={true}
					onChange={this.onSelectDay}
					variant="outlined"
					className={classes.weekday}
				>
                    <MenuItem value="Monday">{this.formatWeekDay("Monday", week[0])}</MenuItem>
                    <MenuItem value="Tuesday">{this.formatWeekDay("Tuesday", week[1])}</MenuItem>
                    <MenuItem value="Wednesday">{this.formatWeekDay("Wednesday", week[2])}</MenuItem>
                    <MenuItem value="Thursday">{this.formatWeekDay("Thursday", week[3])}</MenuItem>
                    <MenuItem value="Friday">{this.formatWeekDay("Friday", week[4])}</MenuItem>
                </Select>
                <FormControl disabled={!this.state.allowed}>
                <Select
                    value={this.state.time_start}
                    name="hours"
                    // autoWidth={true}
					onChange={this.onHourSet}
					variant="outlined"
					className={classes.weekday}
                >
                    {HOURS ? HOURS.map(element =>
                         (<MenuItem value={element} key={element+"dora"}>{element}</MenuItem>)
                    ) : <MenuItem value="olol">govno</MenuItem>}
                </Select>
                </FormControl>
                <Button variant="outlined" color="secondary" onClick={() => this.setState({})}>Cancel</Button>
                <Button variant="contained" color="secondary" onClick={this.registerMeet}>Register Meeting</Button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	general: state.general
});

export default connect(
	mapStateToProps,
	{appointmentAdd}
)(withStyles(styles)(SetMeeting));
