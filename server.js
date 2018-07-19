// server.js

// set up ======================================================================
var express = require('express');
var app = express();

// configuration ===============================================================
// use public folder for js, css, imgs, etc
app.use(express.static('static'));
app.use(express.static(`${__dirname}/ui-react/build`));

// routes ======================================================================
require('./app/routes.js')(app);

// launch ======================================================================
const port = process.env.PORT || 8080;

var theserver = app.listen(port, function(){
	// call controller functions -------------------------------------------------
	var io = require('socket.io').listen(theserver);

	// controller if using room lists
	var controller = require('./app/socket-controller.js')(io);

	// log something so we know the server is working correctly
	console.log(`now we're cooking.`);
});
