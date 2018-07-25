import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  tick = () => {
    this.setState ({
      date: new Date()
    })
  }

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div id="single-room__clock">
        <div id="single-room__time">
          {this.state.date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}
        </div>
        <div id="single-room__date">
          {this.state.date.toLocaleDateString([],{month: 'long', day: '2-digit'})}
        </div>
      </div>

    );
  }
}

export default Clock;
