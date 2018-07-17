import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

import FlightboardLayout from './layouts/flightboard/FlightboardLayout';
import SingleRoomLayout from './layouts/single-room/SingleRoomLayout';
import NotFound from './components/global/NotFound';

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render ((
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={FlightboardLayout} />
        <Route exact path="/single-room/:name" component={SingleRoomLayout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById('app'));
