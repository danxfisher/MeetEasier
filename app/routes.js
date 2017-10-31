module.exports = function(app) {
	var path = require('path');

	// api routes ================================================================
	// returns an array of room objects
	app.get('/api/rooms', function(req, res) {

		var ews = require('../config/ews/rooms.js');

		ews(function(err, rooms) {
			res.json(rooms);
		});
	});

	// returns an array of roomlist objects
	app.get('/api/roomlists', function(req, res) {

		var ews = require('../config/ews/roomlists.js');

		ews(function(err, roomlists) {
			res.json(roomlists);
		});
	});

	// redirects everything else to our react app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname,'../ui-react/build/','index.html'));
	});

};
