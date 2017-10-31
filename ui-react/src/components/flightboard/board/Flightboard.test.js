import React from 'react';
import ReactDOM from 'react-dom';
import Flightboard from './Flightboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Flightboard />, div);
});
