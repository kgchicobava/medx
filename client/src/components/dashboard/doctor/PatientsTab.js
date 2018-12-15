import React, { Component } from "react";
import ThinCard from "../../cards/ThinCard";
import { connect } from "react-redux";
import { getPatientsList } from "../../../actions/utilsActions";
import Loader from "../../tools/Loader";

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
        return <ThinCard key={index} user={elem} />
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
