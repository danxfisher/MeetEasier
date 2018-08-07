import React, { Component } from 'react';

import RoomFilter from './RoomFilter';

class RoomFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      error: false,
      roomlists: []
    };
  }

  getRoomlists = () => {
    return fetch('/api/roomlists')
      .then((response) => response.json())
      .then((data) => {
        if(!data.error){
          this.setState({
            response: true,
            error: false,
            roomlists: data
          });
        }
        else {
          this.setState({
            response: true,
            error: true,
            roomlists: data
          });
        }
      })
  }

  handleFilter = (filterValue) => {
    this.props.filter(filterValue);
  }

  componentDidMount = () => {
    this.getRoomlists();
  }

  render() {
    return (
      <RoomFilter {...this.state} filter={this.handleFilter} />
    );
  }
}

export default RoomFilterContainer;
