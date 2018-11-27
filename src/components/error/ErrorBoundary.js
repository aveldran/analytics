'use-strict';

import './index.css'
import React from 'react'

class ErrorBoundary extends React.Component {
  render() {
    if (this.props.error) {
      return (
      	<div className='error-msg'>
      		<span>Error loading video</span>
      	</div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary