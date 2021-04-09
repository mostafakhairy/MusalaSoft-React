import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
    errorMessage: '',
  };
  componentDidCatch(error, info) {
    console.log('ERROR: ' + error);
    this.setState({ error: true, errorMessage: 'Something went wrong' });
    //CALL SENTRY
  }
  render() {
    if (!this.state.error) {
      return this.props.children;
    } else {
      return <h3>{this.state.errorMessage}</h3>;
    }
  }
}
