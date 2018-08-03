import React, { Component } from 'react';

class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      rooms: []
    };
  }

  getRoomsData = () => {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          rooms: data
        }, () => this.processRoomDetails());
      });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default DisplayContainer;