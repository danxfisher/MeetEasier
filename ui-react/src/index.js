import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

import FlightboardLayout from './layouts/FlightboardLayout';
import SingleRoomLayout from './layouts/SingleRoomLayout';
import NotFound from './components/global/NotFound';

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render ((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FlightboardLayout} />
      <Route exact path="/single-room/:name" component={SingleRoomLayout} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));
