import React from 'react';
import './error-boundary.styles.scss';
// this component renders a fallback ui if there is any form of error within the app

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='error-image-overlay'>
          <div className='error-image-container' />
          <div className='error-image-text'>An Error occured. Refresh to continue</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;