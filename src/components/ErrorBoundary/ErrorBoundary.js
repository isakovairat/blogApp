import React, { Component } from 'react';
import { Alert } from 'antd';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Alert message="Error" type="error" showIcon />;
    }

    return this.props.children;
  }
}