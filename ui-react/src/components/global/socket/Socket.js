import React, { Component } from 'react';

import socketIOClient from 'socket.io-client';

let fbConfig = require('../../../config/flightboard.config.js');

class Socket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      now: new Date(),
      rooms: [],
      endpoint: fbConfig.socketEndpoint
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    console.log("socket connect at: " + endpoint);
    console.log("=====================================");

    socket.on('updatedRooms', (rooms) => {
      let time = new Date();
      for (var i = 0; i < rooms.length; i++) {
        var meetingRoom = rooms[i].Name;
        console.log("updating: " + meetingRoom);
      }
      console.log(" ");
      console.log("time: " + time.toLocaleTimeString());
      console.log("=====================================");

      this.props.response({
        response: true,
        now: new Date(),
        rooms: rooms
      })

      this.setState({
        response: true,
        now: new Date(),
        rooms: rooms
      });
    });

  }

  componentWillUnmount () {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.close();
  }


  render() {
    return null;
  }

}

export default Socket;
