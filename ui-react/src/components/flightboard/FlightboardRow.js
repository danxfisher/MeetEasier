import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as config from '../../config/flightboard.config.js';

const Status = ({ room }) => {
  const statusClass = room.ErrorMessage
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
    <div className={room.RoomAlias + '-meeting-status ' + statusClass} title={room.ErrorMessage || ''}>
      {statusText}
    </div>
  );
};

const Subject = ({ room }) => {
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
        new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) 
        + ' - ' + 
        new Date(parseInt(room.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
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
        <Link to={'/single-room/' + room.RoomAlias} target="_self">
          <i className="fi-monitor"></i>
        </Link>
      }
    </div>
  );
};

const FlightboardRow = ({ room, filter }) => {
  const styles = {
    show: {display: 'block'},
    hide: {display: 'none'},
    flex: {display: 'flex'}
  }

  const roomlist = 'roomlist-' + room.Roomlist.toLowerCase().replace(/\s+/g, "-");

  // set row class based on meet room status
  let roomStatusClass = room.RoomAlias + ' meeting-room';
  roomStatusClass += room.Busy ? ' meeting-room-busy' : '';
  roomStatusClass += room.ErrorMessage ? ' meeting-room-error' : '';

  return (
    <div className={'meeting-room__row row-padder ' + roomlist} style={filter === roomlist || filter === 'roomlist-all' || filter === '' ? styles.show : styles.hide}>
      <div className="row">
      {!room.ErrorMessage &&
        <Link to={'/single-room/' + room.RoomAlias} target="_self">
          <div className="medium-12 columns">
            <div className={roomStatusClass}>
              <div className="row valign-middle">

                <div className={room.RoomAlias + '-status meeting-room__status medium-2 columns'}>
                  <Status room={room} />
                </div>
                <div className="medium-3 columns">
                  <div className={room.RoomAlias + '-name meeting-room__name'}>
                    {room.Name}
                  </div>
                </div>
                <div className="medium-6 columns">
                  <Subject room={room} />
                  <Time room={room} />
                  <Organizer room={room} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      }
      {room.ErrorMessage &&
        <div className="medium-12 columns">
          <div className={roomStatusClass}>
            <div className="row valign-middle">
              <div className={room.RoomAlias + '-status meeting-room__status medium-2 columns'}>
                <Status room={room} />
              </div>
              <div className="medium-3 columns">
                <div className={room.RoomAlias + '-name meeting-room__name'}>
                  {room.Name}
                </div>
              </div>
              <div className="medium-6 columns">
                <Subject room={room} />
                <Time room={room} />
                <Organizer room={room} />
              </div>
              <div className="medium-1 columns">
                <FullScreenIcon room={room} />
              </div>

            </div>
          </div>
        </div>
      }
      </div>
    </div>
  );
};

FlightboardRow.propTypes = {
  room: PropTypes.object,
  key: PropTypes.number,
  filter: PropTypes.string
};

export default FlightboardRow;
