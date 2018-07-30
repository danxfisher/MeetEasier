import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config/flightboard.config.js';

class RoomFilter extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   response: false,
    //   error: false,
    //   roomlists: []
    // }
  }

  // getRoomlist = () => {
  //   return fetch('/api/roomlists')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if(!data.error){
  //         this.setState({
  //           response: true,
  //           error: false,
  //           roomlists: data
  //         });
  //       }
  //       else {
  //         this.setState({
  //           response: true,
  //           error: true,
  //           roomlists: data
  //         });
  //       }
  //     })
  // }

  filterFlightboard = (e) => {
    e.preventDefault();
    this.props.filter(e.target.id);
  }

  componentDidMount() {
    // this.getRoomlist();
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
              <li onClick={this.filterFlightboard} id={'roomlist-' + item.toLowerCase().replace(/\s+/g, "-")}>
                {item}
              </li>
            )
          :
            <p>Loading ...</p>
          }

        </ul>
      </li>
    );
  }
}

RoomFilter.propTypes = {
  filter: PropTypes.func
};

export default RoomFilter;
