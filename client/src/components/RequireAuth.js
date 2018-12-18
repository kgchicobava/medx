import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {

  // If user not authenticated render out to root

  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}