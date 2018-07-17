import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let fbConfig = require('../../config/flightboard.config.js');

class FlightboardRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextUp: '',
      timesPresent: false,
      skippedRoom: false
    }
  }

  getAppointmentTime = () => {
    const { item, now } = this.props;

    // check if there are times in the item.Start & item.End
    // then: if the meeting is not going on now, append "Next Up: "
    if (typeof item.Appointments !== 'undefined' && item.Appointments.length > 0) {
      if (item.Appointments[0].Start && item.Appointments[0].End) {
        this.setState({
          timesPresent: true
        });
        if (item.Appointments[0].Start < now && now < item.Appointments[0].End) { } else {
          this.setState({
            nextUp: fbConfig.board.text.nextUp + ': '
          });
        }
      }
    }
  }

  isRoomSkipped = () => {
    const { item } = this.props;

    fbConfig.board.roomsToSkip.forEach(function(configItem, configKey) {
      if(configItem === item.Email) {
        this.setState({
          skippedRoom: true
        });
      }
    });
  }

  componentDidMount = () => {
    this.isRoomSkipped();
    this.getAppointmentTime();
  }

  render() {
    const { nextUp, skippedRoom, timesPresent } = this.state;
    const { item, now } = this.props;

    const styles = {
      show: {display: 'block'},
      hide: {display: 'none'},
      flex: {display: 'flex'}
    }

    const room = item.Name.toLowerCase().replace(/\s+/g, "-");
    const roomlist = 'roomlist-' + item.Roomlist.toLowerCase().replace(/\s+/g, "-");

    // if the room needs to be skipped, return null
    if (!skippedRoom) {
      let meetingRoomClass = `${ room } meeting-room ${ item.Busy ? 'meeting-room-busy' : '' }`;
      meetingRoomClass += item.Busy ? ' meeting-room-busy' : '';
      meetingRoomClass += item.ErrorMessage ? ' meeting-room-error' : '';
      const meetingClass = item.ErrorMessage
        ? 'meeting-error'
        : item.Busy
          ? 'meeting-busy'
          : 'meeting-open';
      let statusText = item.ErrorMessage
        ? fbConfig.board.text.statusError
        : item.Busy
          ? fbConfig.board.text.statusBusy
          : fbConfig.board.text.statusAvailable;

      return (
        <div className={'row-padder ' + roomlist} style={this.props.filter === roomlist || this.props.filter === 'roomlist-all' || this.props.filter === '' ? styles.show : styles.hide}>
          <div className="row">
            <div className="medium-12 columns">
              <div className={meetingRoomClass}>
                <div className="row valign-middle">
                  <div className={room + '-status meeting-room__status medium-2 columns'}>
                    <div className={meetingClass} title={item.ErrorMessage || ''}>
                      {statusText}
                    </div>
                  </div>
                  <div className="medium-3 columns">
                    <div className={room + '-name meeting-room__name'}>
                      {item.Name}
                    </div>
                  </div>
                  <div className="medium-6 columns">
                    <div className={room + '-meeting-information'}>
                      {timesPresent && item.Appointments[0].End >= now &&
                        <div>
                          <span className={room + '-meeting-upcoming meeting-upcoming'}>
                            {nextUp}
                          </span>
                          <span className={room + '-subject meeting-subject'}>
                            {item.Appointments[0].Subject}
                          </span>
                        </div>
                      }
                    </div>
                    <div className={room + '-time meeting-time'}>
                      {timesPresent ?
                        new Date(parseInt(item.Appointments[0].Start, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(item.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                        : ''
                      }
                    </div>
                    <div className={room + '-organizer meeting-organizer'}>
                      {timesPresent && item.Appointments[0].End >= now &&
                        item.Appointments[0].Organizer
                      }
                    </div>
                  </div>
                  <div className="medium-1 columns">
                    <div className="meeting-fullscreen">

                      <Link to={'/single-room/' + room} target="_blank">
                        <i className="fi-monitor"></i>
                      </Link>

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
}

export default FlightboardRow;
