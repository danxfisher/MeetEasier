import React, { Component } from 'react';

let fbConfig = require('../../config/flightboard.config.js');

class RoomFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      roomlists: []
    }
  }

  getRoomlist = () => {
    return fetch('/api/roomlists')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          response: true,
          roomlists: data
        });
      })
  }

  filterFlightboard = (e) => {
    e.preventDefault();
    this.props.filter(e.target.id);
  }

  componentDidMount() {
    this.getRoomlist();
  }

  render() {
    const { response } = this.state;

    return (
      <li>
        <a href="#" className="current-filter">
          {fbConfig.roomFilter.filterTitle}
        </a>
        <ul className="menu fb__child-dropdown">
          <li onClick={this.filterFlightboard} id="roomlist-all">
            {fbConfig.roomFilter.filterAllTitle}
          </li>

          { response ?
            this.state.roomlists.map((item, key) =>
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

export default RoomFilter;
