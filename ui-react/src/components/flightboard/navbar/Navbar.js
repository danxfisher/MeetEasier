import React, { Component } from 'react';

import Clock from '../clock/Clock';
import RoomFilter from '../room-filter/RoomFilter';

let fbConfig = require('../../../config/flightboard.config.js');

class Navbar extends Component {

  handleFilter(filterValue) {
    this.props.filter(filterValue);
  }

  render () {
    return (
      <div id="title-bar-wrap">
        <div className="title-bar">
          <div className="title-bar-left">
            <ul className="horizontal menu fb__nav-menu">
              <li>
                <img src="img/logo.png" alt="Logo" />
              </li>
              <li>

                {fbConfig.title}

                <br />
                <ul id="roomlist-filter" className="dropdown menu fb__dropdown" data-dropdown-menu>
                  <RoomFilter filter={this.handleFilter.bind(this)}/>
                </ul>
              </li>
            </ul>
          </div>
          <div className="title-bar-right">
            <ul className="horizontal menu fb__nav-menu-right">

              <li id="the-clock">
                <Clock />
              </li>

            </ul>
          </div>
        </div>
        <div id="flightboard"></div>
      </div>
    )
  }
}

export default Navbar;
