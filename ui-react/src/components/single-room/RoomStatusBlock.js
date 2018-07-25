import React from 'react';
import PropTypes from 'prop-types';

const RoomStatusBlock = props => (
  <div className={props.room.Busy ? 'columns small-8 left-col busy' : 'columns small-8 left-col open'}>
    <div id="single-room__room-name">{props.room.Name}</div>
    <div id="single-room__room-status">{props.room.Busy ? props.config.statusBusy : props.config.statusAvailable}</div>
    { props.details.appointmentExists ?
      <div id="single-room__meeting-title">
        <span id="single-room__next-up">
          {props.details.nextUp}
        </span>
        {props.room.Appointments[0].Subject}
      </div>
    :
      ''
    }
    <div id="single-room__meeting-time">
      { props.details.timesPresent ?
        new Date(parseInt(props.room.Appointments[0].Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(props.room.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      :
        ''
      }
    </div>
    { props.details.appointmentExists ?
      <div id="single-room__meeting-organizer">
        {props.room.Appointments[0].Organizer}
      </div>
    :
      ''
    }
  </div>
);

RoomStatusBlock.propTypes = {
  room: PropTypes.array,
  details: PropTypes.object,
  config: PropTypes.object
}

export default RoomStatusBlock;
