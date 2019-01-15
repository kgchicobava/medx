/*
Component that show dialog for registering token for patient
@NEED FOR RENAME
@REMOVE STORE
@imported in NavTabs2
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
// Actions
import {
	findToken,
    getDoctorsList,
    clearFinded
} from "../../actions/utilsActions";
// Components
import SearchTokenDialog from "./SearchTokenDialog";
import CardProfile from "./CardProfile";
import Loader from "../utils/Loader";

const styles = theme => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});

class DoctorsList extends Component {
	state = {
		dialogOpen: false,
		token: ""
	};
	dialogOpen = () => {
		this.setState({ dialogOpen: true });
	};

	dialogClose = () => {
        this.props.clearFinded();
		this.setState({ dialogOpen: false, token: "" });
	};

	handleFab = () => {
		this.dialogOpen();
	};

	handleToken = () => {
		this.props.findToken(this.state.token);
	};

	onChangeDialog = ev => {
		this.setState({
			token: ev.target.value
		});
	};

	componentDidMount() {
		this.props.getDoctorsList(this.props.auth.user.id);
	}

	render() {
		let content = null;
		let { doctorData, findedDoctor } = this.props.general;
		const { classes } = this.props;
		if (doctorData == null) {
			content = (
				<div className="centerize">
					<Loader />
				</div>
			);
		} else {
			content = doctorData.map((elem, index) => {
				return (
					<CardProfile
						parent={this.props.auth.user.id}
						key={index}
						user={elem}
					/>
				);
			});
		}

		return (
			<div className="doctorsTab">
				<div className="gridCardProdile">{content}</div>
				<div>
					<Fab
						color="secondary"
						aria-label="Add"
						className={classes.fab}
						onClick={this.handleFab}>
						<AddIcon />
					</Fab>
				</div>
				<Dialog
					open={this.state.dialogOpen}
					onClose={this.dialogClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Add your doctor
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To find your doctor, and then add to the available
							list, please insert token, that you received in
							e-mail letter from doctor.
						</DialogContentText>
						<div className="flex">
							<TextField
								autoFocus
								margin="dense"
								id="token"
								label="Token"
								type="text"
								onChange={this.onChangeDialog}
								fullWidth
							/>
							<IconButton
								onClick={this.handleToken}
								color="primary">
								<SearchIcon />
							</IconButton>
						</div>
					</DialogContent>
					{findedDoctor ? (
						<SearchTokenDialog
							close={() => {
								this.dialogClose();
							}}
                            doctor={findedDoctor}
						/>
					) : (
						""
					)}
					<DialogActions>
						<Button
							onClick={() => {
								this.dialogClose();
							}}
							color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
//TE36mdgnKEh6Nic6s4XN7D
function mapStateToProps(state) {
	return {
		general: state.general,
		auth: state.auth
	};
}

export default connect(
	mapStateToProps,
	{ findToken, getDoctorsList, clearFinded }
)(withStyles(styles)(DoctorsList));
