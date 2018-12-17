/*
Component that show in doctors my patients tab, list of all registered with this doctor
@NEED FOR RENAME
@imported in NavTabs
*/
import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import { getPatientsList } from "../../actions/utilsActions";
// Components
import ThinProfile from "./ThinProfile";
import Loader from "../utils/Loader";

class PatientsTab extends Component {
  componentDidMount() {
    this.props.getPatientsList(this.props.auth.user.id);
  }
  render() {
    let content = null;
    let { patientData } = this.props.general;
    if(patientData == null) {
      content = <Loader />
    } else {
      content = patientData.map((elem, index) => {
        return <ThinProfile key={index} user={elem} />
      })
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth, general: state.general });

export default connect(mapStateToProps, {getPatientsList})(PatientsTab);
