import React, { Component } from 'react';

import Flightboard from '../components/flightboard/Flightboard';
import Navbar from '../components/flightboard/Navbar';

class FlightboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filterValue){
    this.setState({
      filter: filterValue
    });
  }

  render () {
    const { filter } = this.state;
    return (
      <div id="page-wrap">
        <Navbar filter={this.handleFilter}/>
        <Flightboard filter={filter}/>
      </div>
    )
  }
}

export default FlightboardLayout;
