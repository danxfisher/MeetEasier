import React, { Component } from 'react';

import Clock from './Clock.js';
import RoomStatusBlock from './RoomStatusBlock';
import Sidebar from './Sidebar';
import Socket from '../global/Socket';
import Spinner from '../global/Spinner';

let srConfig = require('../../config/singleRoom.config.js');

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      now: new Date(),
      roomAlias: this.props.alias,
      rooms: [],
      room: []
    }
  }

  getRoomsData = () => {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          rooms: data
        }, () => this.filterForCurrentRoom());
      })
  }

  filterForCurrentRoom = () => {
    const { rooms, roomAlias } = this.state;

    let room = rooms.filter(item => item.RoomAlias === roomAlias);

    this.setState({
      response: true,
      room: room
    });
  }

  handleSocket = (socketResponse) => {
    this.setState({
      response: socketResponse.response,
      now: socketResponse.now,
      rooms: socketResponse.rooms
    }, () => this.filterForCurrentRoom());
  }

  componentDidMount = () => {
    this.getRoomsData();
  }

  render() {
    const { now, response, room } = this.state;

    return (
      <div>
        <Socket response={this.handleSocket}/>

        { response ?
          <div className="row expanded full-height">

            {/* include props: room  */}
            <RoomStatusBlock room={room} />
            <Sidebar room={room} />

          </div>
        :
          <Spinner />
        }
      </div>
    );
  }

}

export default Display;
