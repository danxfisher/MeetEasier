module.exports = function (io){
  var isRunning = false;
  
  // Check and update rooms every 60 seconds -----------------------------------
    io.of('/').on('connection', function(socket) {
      if (!isRunning) {
        (function callEWS(){
          var ews = require('./ews/rooms.js');

        	ews(function(err, result) {
            if (result) {
              if (err) return console.log(err);
              // send data to page
              io.of('/').emit('updatedRooms', result);
            }

            io.of('/').emit('controllerDone', 'done');
        	});

          setTimeout(callEWS, 15000);
        })();
      }

      isRunning = true;
    });
};
