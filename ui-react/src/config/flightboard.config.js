module.exports = {
  'board' : {
    'text' : {
      'nextUp' : 'Next Up',
      'statusAvailable' : 'Open',
      'statusBusy' : 'Busy',
      'statusError' : 'Error'
    }
  },

  'navbar' : {
    'title' : 'Conference Room Availability',
  },

  'roomFilter' : {
    'filterTitle' : 'Locations',
    'filterAllTitle' : 'All Conference Rooms',
  },

  'socket' : {
    'endpoint' : `${process.env.PUBLIC_URL || 'http://localhost:8080'}`,
  }
};
