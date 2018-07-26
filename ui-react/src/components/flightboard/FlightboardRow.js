import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let config = require('../../config/flightboard.config.js');

class FlightboardRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextUp: '',
      timesPresent: false
    }
  }

  getAppointmentTime = () => {
    const { room, now } = this.props;

    // check if there are times in the room.Start & room.End
    // then: if the meeting is not going on now, append "Next Up: "
    if (typeof room.Appointments !== 'undefined' && room.Appointments.length > 0) {
      if (room.Appointments[0].Start && room.Appointments[0].End) {
        this.setState({
          timesPresent: true
        });

        if (room.Busy) {
          this.setState({
            nextUp: ''
          });
        }
        else {
          this.setState({
            nextUp: config.board.nextUp + ': '
          });
        }
      }
    }
  }

  componentDidUpdate = () => {
    this.getAppointmentTime();
  }

  componentDidMount = () => {
    this.getAppointmentTime();
  }

  render() {
    const { nextUp, timesPresent } = this.state;
    const { room, now } = this.props;

    const styles = {
      show: {display: 'block'},
      hide: {display: 'none'},
      flex: {display: 'flex'}
    }

    const roomlist = 'roomlist-' + room.Roomlist.toLowerCase().replace(/\s+/g, "-");

    // set row class based on meet room status
    let meetingRoomClass = `${ room.RoomAlias } meeting-room ${ room.Busy ? 'meeting-room-busy' : '' }`;
    meetingRoomClass += room.Busy ? ' meeting-room-busy' : '';
    meetingRoomClass += room.ErrorMessage ? ' meeting-room-error' : '';

    const meetingClass = room.ErrorMessage
      ? 'meeting-error'
      : room.Busy
        ? 'meeting-busy'
        : 'meeting-open';

    let statusText = room.ErrorMessage
      ? config.board.statusError
      : room.Busy
        ? config.board.statusBusy
        : config.board.statusAvailable;

    return (
      <div className={'row-padder ' + roomlist} style={this.props.filter === roomlist || this.props.filter === 'roomlist-all' || this.props.filter === '' ? styles.show : styles.hide}>
        <div className="row">
          <div className="medium-12 columns">
            <div className={meetingRoomClass}>
              <div className="row valign-middle">

                <div className={room.RoomAlias + '-status meeting-room__status medium-2 columns'}>
                  <div className={meetingClass} title={room.ErrorMessage || ''}>
                    {statusText}
                  </div>
                </div>
                <div className="medium-3 columns">
                  <div className={room.RoomAlias + '-name meeting-room__name'}>
                    {room.Name}
                  </div>
                </div>
                <div className="medium-6 columns">
                  <div className={room.RoomAlias + '-meeting-information'}>
                    {timesPresent && room.Appointments[0].End >= now &&
                      <div>
                        <span className={room.RoomAlias + '-meeting-upcoming meeting-upcoming'}>
                          {nextUp}
                        </span>
                        <span className={room.RoomAlias + '-subject meeting-subject'}>
                          {room.Appointments[0].Subject}
                        </span>
                      </div>
                    }
                  </div>
                  <div className={room.RoomAlias + '-time meeting-time'}>
                    {timesPresent ?
                      new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(room.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                    :
                      ''
                    }
                  </div>
                  <div className={room.RoomAlias + '-organizer meeting-organizer'}>
                    {timesPresent && room.Appointments[0].End >= now &&
                      room.Appointments[0].Organizer
                    }
                  </div>
                </div>
                <div className="medium-1 columns">
                  <div className="meeting-fullscreen">
                    {!room.ErrorMessage &&
                      <Link to={'/single-room/' + room.RoomAlias} target="_blank">
                        <i className="fi-monitor"></i>
                      </Link>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FlightboardRow.propTypes = {
  room: PropTypes.string,
  now: PropTypes.instanceOf(Date),
  key: PropTypes.number,
  filter: PropTypes.string
};

export default FlightboardRow;
