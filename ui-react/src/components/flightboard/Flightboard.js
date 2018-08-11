import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FlightboardRow from './FlightboardRow';
import Socket from '../global/Socket';
import Spinner from '../global/Spinner';

class Flightboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      error: false,
      now: new Date(),
      rooms: []
    }

    this.handleSocket = this.handleSocket.bind(this);
  }

  getRoomData() {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        if(!data.error){
          this.setState({
            response: true,
            error: false,
            rooms: data
          });
        }
        else {
          this.setState({
            response: true,
            error: true,
            rooms: data
          });
        }
      });
  }

  handleSocket(socketResponse) {
    this.setState({
      response: socketResponse.response,
      now: socketResponse.now,
      rooms: socketResponse.rooms
    });
  }

  componentDidMount = () => {
    this.getRoomData();
  }

  render() {
    const { error, now, response, rooms } = this.state;

    return (
      <div className="tracker-wrap">
        <Socket response={this.handleSocket} />

        { response ?
          (!error ?
            rooms.map((room, key) =>
              <FlightboardRow room={room} key={key} filter={this.props.filter} />
            )
          :
            <div className="container">
              <div className="credentials-error">{rooms.error}</div>
            </div>
          )
        :
          <Spinner />
        }
      </div>
    );
  }

}

Flightboard.propTypes = {
  filter: PropTypes.string
};

export default Flightboard;
