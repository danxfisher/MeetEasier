module.exports = function(app) {
	var path = require('path');

	// api routes ================================================================
	// returns an array of room objects
	app.get('/api/rooms', function(req, res) {

		var ews = require('./ews/rooms.js');

		ews(function(err, rooms) {
			if (err) {
				if (err.responseCode === 127) {
					res.json({error: 'Oops, there seems to be an issue with the credentials you have supplied.  Make sure you typed them correctly and that you have access to Exchange Roomlists.'});
				}
				else {
					res.json({error: 'Hmm, there seems to be a weird issue occuring.'});
				}
			}
			else {
				res.json(rooms);
			}
		});
	});

	// returns an array of roomlist objects
	app.get('/api/roomlists', function(req, res) {

		var ews = require('./ews/roomlists.js');

		ews(function(err, roomlists) {
			if (err) {
				if (err.responseCode === 127) {
					res.json({error: 'Oops, there seems to be an issue with the credentials you have supplied.  Make sure you typed them correctly and that you have access to Exchange Roomlists.'});
				}
				else {
					res.json({error: 'Hmm, there seems to be a weird issue occuring.'});
				}
			}
			else {
				res.json(roomlists);
			}
		});
	});

	// heartbeat-service to check if server is alive
 	app.get('/api/heartbeat', function(req, res) {
    	res.json({ status: 'OK' });
  	});
	
	// books a room
	app.get('/api/roombooking', function(req, res){

		console.log("Route Room Booking");
		//console.log(req);

		var ews = require('./ews/roombooking.js');
		var roomEmail = req.query.roomEmail;
		var roomName = req.query.roomName;
		var startTime = req.query.startTime;
		var endTime = req.query.endTime;
		var bookingType = req.query.bookingType;
		console.log(roomEmail+" | "+roomName+" | "+startTime+" | "+endTime+" | "+bookingType);
		ews.BookRoom(roomEmail, roomName, startTime, endTime, bookingType);
			res.json({ status: 'Booked' });
	});
	// redirects everything else to our react app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname,'../ui-react/build/','index.html'));
	});

};
