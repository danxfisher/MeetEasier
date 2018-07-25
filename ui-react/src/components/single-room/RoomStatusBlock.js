import React, { Component } from 'react';
import PropTypes from 'prop-types';

let srConfig = require('../../config/singleRoom.config.js');

class RoomStatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentExists: false,
      timesPresent: false,
      nextUp: ''
    }
  }

  roomAppointmentValidation = () => {
    const { room } = this.props;

    // check if there are times in the room.Start & room.End
    // then: if the meeting is not going on now, append "Next Up: "
    if (typeof room.Appointments !== 'undefined' && room.Appointments.length > 0) {
      this.setState({
        appointmentExists: true
      });

      if (room.Appointments[0].Start && room.Appointments[0].End) {
        this.setState({
          timesPresent: true
        });

        if (room.Busy === 'true') {
          this.setState({
            nextUp: ''
          });
        }
        else {
          this.setState({
            nextUp: srConfig.nextUp + ': '
          });
        }
      }
      else {
        this.setState({
          timesPresent: false
        });
      }
    }
    else {
      this.setState({
        appointmentExists: false
      });
    }
  }

  componentDidMount = () => {
    this.roomAppointmentValidation();
  }

  render() {
    const { room } = this.state;
    const { appointmentExists } = this.state;
    return (
      <div className={room.Busy ? 'columns small-8 left-col busy' : 'columns small-8 left-col open'}>
        <div id="single-room__room-name">{room.Name}</div>
        <div id="single-room__room-status">{room.Busy ? srConfig.statusBusy : srConfig.statusAvailable}</div>
        { appointmentExists ?
          <div id="single-room__meeting-title">
            <span id="single-room__next-up">
              {nextUp}
            </span>
            {room.Appointments[0].Subject}
          </div>
        : ''
        }
        <div id="single-room__meeting-time">
          {timesPresent ?
            new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(item.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            : ''
          }
        </div>
        { appointmentExists ?
          <div id="single-room__meeting-organizer">
            {room.Appointments[0].Organizer}
          </div>
          : ''
        }
      </div>
    );
  }

}

RoomStatusBlock.propTypes = {
  room: Prop
}

export default RoomStatusBlock;
