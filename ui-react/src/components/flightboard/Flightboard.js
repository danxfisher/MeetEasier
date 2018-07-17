import React, { Component } from 'react';

import FlightboardRow from './FlightboardRow';
import Socket from '../global/Socket';
import Spinner from '../global/Spinner';

class Flightboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      now: new Date(),
      rooms: []
    }
  }

  getRoomData = () => {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          response: true,
          rooms: data
        });
      })
  }

  handleSocket = (socketResponse) => {
    this.setState({
      response: socketResponse.response,
      now: socketResponse.now,
      rooms: socketResponse.rooms
    })
  }

  componentDidMount = () => {
    this.getRoomData();
  }

  render() {
    const { response, now } = this.state;

    return (
      <div className="tracker-wrap">
        <Socket response={this.handleSocket} />

        { response ?
          this.state.rooms.map((room, key) =>
            <FlightboardRow item={room} now={now} key={key} filter={this.props.filter} />
          )
        :
          <Spinner />
        }
      </div>
    );
  }

}

export default Flightboard;
