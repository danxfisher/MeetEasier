import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Clock from './Clock';
import RoomFilterContainer from './RoomFilterContainer';

let config = require('../../config/flightboard.config.js');

class Navbar extends Component {

  handleFilter = (filterValue) => {
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
                {config.navbar.title}
                <br />
                <ul id="roomlist-filter" className="dropdown menu fb__dropdown" data-dropdown-menu>
                  <RoomFilterContainer filter={this.handleFilter}/>
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
      </div>
    )
  }
}

Navbar.propTypes = {
  filter: PropTypes.func
};

export default Navbar;
