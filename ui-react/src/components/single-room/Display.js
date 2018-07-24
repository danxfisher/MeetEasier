import React, { Component } from 'react';

import Clock from './Clock.js';
import Socket from '../global/Socket';

let srConfig = require('../../config/singleRoom.config.js');

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      now: new Date(),
      roomAlias: this.props.alias,
      rooms: []
    }
  }

  componentDidMount() {
    return fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          response: true,
          rooms: data
        });
      })
  }

  handleSocket(socketResponse) {
    this.setState({
      response: socketResponse.response,
      now: socketResponse.now,
      rooms: socketResponse.rooms
    })
  }

  render() {
    const { response } = this.state;
    const { now } = this.state;
    const { roomAlias } = this.state;

    return (
      <div>
        <Socket response={this.handleSocket.bind(this)}/>
        { response ?
          this.state.rooms.map(function(item, key) {
            let nextUp = '';
            let timesPresent = false;
            let appointmentExists = false;
            let upcomingTable = false;

            // check if there are times in the item.Start & item.End
            // then: if the meeting is not going on now, append "Next Up: "
            if (typeof item.Appointments !== 'undefined' && item.Appointments.length > 0) {
              appointmentExists = true;

              if (item.Appointments.length > 1) {
                upcomingTable = true;
              }

              if (item.Appointments[0].Start && item.Appointments[0].End) {
                timesPresent = true;
                if (item.Appointments[0].Start < now && now < item.Appointments[0].End) { } else {
                  nextUp = srConfig.text.nextUp + ': ';
                }
              }
            }
            return (
              <div>
              {item.RoomAlias === roomAlias &&
                <div className="row expanded full-height">

                  <div className={item.Busy ? 'columns small-8 left-col busy' : 'columns small-8 left-col open'}>
                    <div id="single-room__room-name">{item.Name}</div>
                    <div id="single-room__room-status">{item.Busy ? srConfig.text.statusBusy : srConfig.text.statusAvailable}</div>
                    { appointmentExists ?
                      <div id="single-room__meeting-title">
                        <span id="single-room__next-up">
                          {nextUp}
                        </span>
                        {item.Appointments[0].Subject}
                      </div>
                      : ''
                    }
                    <div id="single-room__meeting-time">
                      {timesPresent ?
                        new Date(parseInt(item.Appointments[0].Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(item.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                        : ''
                      }
                    </div>
                    { appointmentExists ?
                      <div id="single-room__meeting-organizer">
                        {item.Appointments[0].Organizer}
                      </div>
                      : ''
                    }
                  </div>
                  <div className="columns small-4 right-col">
                    <div id="single-room__clock-wrap">
                      <Clock />
                    </div>
                    <div id="upcoming-title">
                      {srConfig.text.upcomingTitle}
                    </div>
                    <table>
                      { upcomingTable ?
                        item.Appointments.slice(1).map(function(aItem, aKey){
                        return (
                          <tr>
                            <td className="up__meeting-title">{aItem.Subject}</td>
                            <td className="up__meeting-time" width="44%">
                              {timesPresent ?
                                new Date(parseInt(aItem.Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(parseInt(aItem.End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                                : ''
                              }
                            </td>
                          </tr>
                        );
                      }) : ''}
                    </table>
                  </div>
                </div>
              }
            </div>

            );
          })

          :
          <p id="fb__spinner-wrap"><img id="fb__spinner" alt="Loading..." src="/svgs/spinner.svg" /></p>
        }
      </div>
    );
  }

}

export default Display;
