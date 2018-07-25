import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Clock from './Clock';

let srConfig = require('../../config/singleRoom.config.js');

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingTable: false
    }
  }

  validateFutureAppointments = () => {
    const { room } = this.props;

    // check if there are times in the room.Start & room.End
    // then: if the meeting is not going on now, append "Next Up: "
    if (typeof room.Appointments !== 'undefined' && room.Appointments.length > 0) {
      if (room.Appointments.length > 1) {
        this.setState({
          upcomingTable: true
        });
      }
    }
    else {
      this.setState({
        upcomingTable: false
      });
    }
  }

  componentDidUpdate = () => {
    this.validateFutureAppointments();
  }

  componentDidMount = () => {
    this.validateFutureAppointments();
  }

  render() {
    const { room } = this.props;
    const { upcomingTable } = this.state;

    return (
      <div className="columns small-4 right-col">
        <div id="single-room__clock-wrap">
          <Clock />
        </div>
        <div id="upcoming-title">
          {srConfig.text.upcomingTitle}
        </div>
        <table>
          { upcomingTable ?
            room.Appointments.slice(1).map((item, key) => {
              return (
                <tr>
                  <td className="up__meeting-title">{item.Subject}</td>
                  <td className="up__meeting-time" width="44%">
                    { item.Start && item.End ?
                      new Date(parseInt(item.Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(item.End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                    :
                      ''
                    }
                  </td>
                </tr>
              );
            })
          :
            ''
          }
        </table>
      </div>
    );
  }

}

Sidebar.propTypes = {
  room: PropTypes.array
}

export default Sidebar;
