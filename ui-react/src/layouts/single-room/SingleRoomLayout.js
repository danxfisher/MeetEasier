import React, { Component } from 'react';

import Display from '../../components/single-room/Display';
import NotFound from '../../components/global/NotFound';

class SingleRoomLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomAlias: props.match.params.name
    }
  }

  render () {
    const { roomAlias } = this.state;
    return (

      <div id="single-room__wrap">
        { roomAlias ?
          <Display data={this.state.roomAlias} />
        :
          <div id="error-wrap">
            <NotFound />
          </div>
        }
      </div>

    )
  }
}

export default SingleRoomLayout;
