import React, { Component } from 'react';

class NotFound extends Component {
  render () {
    return (
      <div id="error-text">
        <div id="error-header">Sorry :(</div>
        Either there was an error in processing or this page does not exist.
      </div>
    )
  }
}

export default NotFound;
