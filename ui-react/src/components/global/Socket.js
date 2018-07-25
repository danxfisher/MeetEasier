import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

class Socket extends Component {
  componentDidMount = () => {
    const socket = socketIOClient();

    socket.on('updatedRooms', (rooms) => {
      this.props.response({
        response: true,
        rooms: rooms
      });
    });
  }

  componentWillUnmount = () => {
    const socket = socketIOClient();
    socket.close();
  }

  render() {
    return null;
  }
}

Socket.propTypes = {
  response: PropTypes.func
}

export default Socket;
