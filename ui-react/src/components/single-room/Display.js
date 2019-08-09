import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config/singleRoom.config.js';

import RoomStatusBlock from './RoomStatusBlock';
import Sidebar from './Sidebar';
import Socket from '../global/Socket';
import Spinner from '../global/Spinner';

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorOccurred: false }
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true })
    console.log(error);
  }
  render() {
    console.log("ErrorHandler RENDER");
    if (this.state.errorOccurred){

      window.location.reload();
     return <div><h2>SOMETHING WENT WRONG - RELOADING</h2></div> 
    }
    else{
       return this.props.children; 
    } 
  }
}

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      roomAlias: this.props.alias,
      rooms: [],
      room: [],
      roomDetails: {
        appointmentExists: false,
        timesPresent: false,
        upcomingAppointments: false,
        nextUp: ''
      }
    }
  }

  getRoomsData = () => {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          rooms: data
        }, () => this.processRoomDetails());
      })
  }

  processRoomDetails = () => {
    const { rooms, roomAlias } = this.state;
    let roomArray = rooms.filter(item => item.RoomAlias === roomAlias);
    let room = roomArray[0];
	
    // 1) ensure that appointments exist for the room
    // 2) check if there are more than 1 upcoming appointments
    // 3) check if there are times in the room.Start & room.End
    // 4) if the meeting is not going on now, append "Next Up: "
    if (typeof room.Appointments !== 'undefined' && room.Appointments.length > 0) {
      this.setState(prevState => ({
        roomDetails: {
          ...prevState.roomDetails,
          appointmentExists: true
        }
      }));
      if (room.Appointments.length > 1) {
        this.setState(prevState => ({
          roomDetails: {
            ...prevState.roomDetails,
            upcomingAppointments: true
          }
        }));
      }

      if (room.Appointments[0].Start && room.Appointments[0].End) {
        this.setState(prevState => ({
          roomDetails: {
            ...prevState.roomDetails,
            timesPresent: true
          }
        }));

        if (!room.Busy) {
          this.setState(prevState => ({
            roomDetails: {
              ...prevState.roomDetails,
              nextUp: config.nextUp + ': '
            }
          }));
        }
        else {
          this.setState(prevState => ({
            roomDetails: {
              ...prevState.roomDetails,
              nextUp: ''
            }
          }));
        }
      }
    }

    this.setState({
      response: true,
      room: room
    });
  }

  handleSocket = (socketResponse) => {
    this.setState({
      response: socketResponse.response,
      rooms: socketResponse.rooms
    }, () => this.processRoomDetails());
  }

  componentDidMount = () => {
    this.getRoomsData();
  }

  render() {
    const { response, room, roomDetails } = this.state;

    return (
      <ErrorHandler>
      <div>
        <Socket response={this.handleSocket}/>

        { response ?
          <div className="row expanded full-height">
            <RoomStatusBlock room={room} details={roomDetails} config={config} />
            <Sidebar room={room} details={roomDetails} config={config} />
          </div>
        :
          <Spinner />
        }
      </div>
      </ErrorHandler>
    );
  }
}

Display.propTypes = {
  alias: PropTypes.string
}

export default Display;
