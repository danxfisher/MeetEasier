import React, { Component } from 'react';

let fbConfig = require('../../../config/flightboard.config.js');

class RoomFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      roomlists: []
    }
  }

  componentDidMount() {
    return fetch('/api/roomlists')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          response: true,
          roomlists: data
        });

      })
  }

  filterFlightboard(e) {
    e.preventDefault();
    this.props.filter(e.target.id);
  }

  render() {
    const { response } = this.state;

    return (
      <li>
        <a href="#" className="current-filter">

          {fbConfig.filterTitle}

        </a>
        <ul className="menu fb__child-dropdown">
          <li onClick={this.filterFlightboard.bind(this)} id="roomlist-all">

            {fbConfig.filterAllTitle}

          </li>
          { response ?
            this.state.roomlists.map(function(item, key) {
              return (
                <li onClick={this.filterFlightboard.bind(this)} id={'roomlist-' + item.toLowerCase().replace(/\s+/g, "-")}>{item}</li>
              )
            }.bind(this))
            : <p>Loading ...</p>
          }
        </ul>
      </li>
    );
  }
}

export default RoomFilter;
