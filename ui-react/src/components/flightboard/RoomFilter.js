import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config/flightboard.config.js';

class RoomFilter extends Component {

  filterFlightboard = (e) => {
    this.props.filter(e.target.id);
  }

  render() {
    const { error, response, roomlists } = this.props;

    return (
      <li>
        <a href="#" className="current-filter">
          {config.roomFilter.filterTitle}
        </a>
        <ul className="menu fb__child-dropdown">
          <li onClick={this.filterFlightboard} id="roomlist-all">
            {config.roomFilter.filterAllTitle}
          </li>

          { response && !error ?
            roomlists.map((item, key) =>
              <li onClick={this.filterFlightboard} key={key} id={'roomlist-' + item.toLowerCase().replace(/\s+/g, "-")}>
                {item}
              </li>
            )
          :
            <li id="roomlist__loading">
              Loading ...
            </li>
          }

        </ul>
      </li>
    );
  }
}

RoomFilter.propTypes = {
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ])
};

export default RoomFilter;
