import React from 'react';
import ErrorPage from '../pages/ErrorPage';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Aquahevan Runtime Error Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = 'home';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          errorCode="500"
          errorTitle="Application Render Issue"
          errorMessage="Client-side ya server runtime connection me error detect hua hai. Aap retry kar sakte hain ya homepage par vapas ja sakte hain."
          technicalDetails={{
            message: this.state.error?.message,
            stack: this.state.error?.stack,
            componentStack: this.state.errorInfo?.componentStack
          }}
          onRetry={this.handleReset}
          onGoHome={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
