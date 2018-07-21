import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class Socket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      now: new Date(),
      rooms: []
    }
  }

  componentDidMount = () => {
    const socket = socketIOClient();

    socket.on('updatedRooms', (rooms) => {
      let time = new Date();
      for (let i = 0; i < rooms.length; i++) {
        let meetingRoom = rooms[i].Name;
      }

      this.props.response({
        response: true,
        now: new Date(),
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

export default Socket;
