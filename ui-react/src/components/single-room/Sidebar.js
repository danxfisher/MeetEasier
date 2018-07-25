import React, { Component } from 'react';
import PropTypes from 'prop-types';

let srConfig = require('../../config/singleRoom.config.js');

class Sidebar extends Component {

  render() {
    const { room } = this.state;
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
            room.Appointments.slice(1).map(function(item, key){
            return (
              <tr>
                <td className="up__meeting-title">{item.Subject}</td>
                <td className="up__meeting-time" width="44%">
                  {timesPresent ?
                    new Date(parseInt(item.Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(item.End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                    : ''
                  }
                </td>
              </tr>
            );
          }) : ''}
        </table>
      </div>
    );
  }

}

Sidebar.propTypes = {

}

export default Sidebar;
