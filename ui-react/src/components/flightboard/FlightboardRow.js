import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let config = require('../../config/flightboard.config.js');

const Status = ({ room }) => {
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
    <div className={meetingClass} title={room.ErrorMessage || ''}>
      {statusText}
    </div>
  );
};

const NextUp = ({ room }) => {

}

const Appointment = ({ room }) => {
  return (
    <div className={room.RoomAlias + '-meeting-information'}>
      {room.Appointments.length > 0 &&
        <div>
          <span className={room.RoomAlias + '-meeting-upcoming meeting-upcoming'}>
            {room.Busy ? '' : config.board.nextUp + ': '}
          </span>
          <span className={room.RoomAlias + '-subject meeting-subject'}>
            {room.Appointments[0].Subject}
          </span>
        </div>
      }
    </div>
  );
};

const Time = ({ room }) => {
  return (
    <div className={room.RoomAlias + '-time meeting-time'}>
      {room.Appointments.length > 0 &&
        new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(room.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      }
    </div>
  );
};

const Organizer = ({ room }) => {
  return (
    <div className={room.RoomAlias + '-organizer meeting-organizer'}>
      {room.Appointments.length > 0 &&
        room.Appointments[0].Organizer
      }
    </div>
  );
};

const FullScreenIcon = ({ room }) => {
  return (
    <div className="meeting-fullscreen">
      {!room.ErrorMessage &&
        <Link to={'/single-room/' + room.RoomAlias} target="_blank">
          <i className="fi-monitor"></i>
        </Link>
      }
    </div>
  );
};

const FlightboardRow = ({ room }) => {
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

  return (
    <div className={'row-padder ' + roomlist} style={this.props.filter === roomlist || this.props.filter === 'roomlist-all' || this.props.filter === '' ? styles.show : styles.hide}>
      <div className="row">
        <div className="medium-12 columns">
          <div className={meetingRoomClass}>
            <div className="row valign-middle">

              <div className={room.RoomAlias + '-status meeting-room__status medium-2 columns'}>
                <Status />
              </div>
              <div className="medium-3 columns">
                <div className={room.RoomAlias + '-name meeting-room__name'}>
                  {room.Name}
                </div>
              </div>
              <div className="medium-6 columns">
                <Appointment />
                <Time />
                <Organizer />
              </div>
              <div className="medium-1 columns">
                <FullScreenIcon />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FlightboardRow.propTypes = {
  room: PropTypes.string,
  now: PropTypes.instanceOf(Date),
  key: PropTypes.number,
  filter: PropTypes.string
};

export default FlightboardRow;
