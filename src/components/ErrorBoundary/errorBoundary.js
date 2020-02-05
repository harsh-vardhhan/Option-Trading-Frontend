import React from 'react';

class ErrorBoundary extends React.Component {
  state = {hasError: false, errorInfo: ''};
  componentDidCatch(error, errorInfo) {
      this.setState({
          hasError: true,
          errorInfo
      });
  }
  render() {
      if (this.state.hasError) {
          return (
              <div>
          Something went wrong
                  {this.state.info}
              </div>
          );
      }
      return this.props.children;
  }
}

export {ErrorBoundary};
