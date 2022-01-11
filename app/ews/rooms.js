module.exports = function (callback) {

  // modules -------------------------------------------------------------------
  var ews = require("ews-javascript-api");
  var auth = require("../../config/auth/auth.js");
  var blacklist = require("../../config/room-blacklist.js");
  
  //if NTLM
  require('dotenv').config()
  //console.log(".env = " + process.env.REACT_APP_EnableNTLM);
  if (process.env.REACT_APP_EnableNTLM=="true") {
    var ewsNTLM = require("ews-javascript-api-auth");
    ews.ConfigurationApi.ConfigureXHR(new ewsNTLM.ntlmAuthXhrApi(auth.exchange.username, auth.exchange.password, true));
  }
  //
  const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
    exch.Credentials = new ews.WebCredentials(auth.exchange.username, auth.exchange.password);
  exch.Url = new ews.Uri(auth.exchange.uri);

  // promise: get all room lists
  var getListOfRooms = function () {
    var promise = new Promise(function (resolve, reject) {
      exch.GetRoomLists().then((lists) => {
        var roomLists = lists.items;
        resolve(roomLists);
      }, (err) => {
        callback(err, null);
      });
    })
    return promise;
  };

  // promise: get all rooms in room lists
  var getRoomsInLists = function (roomLists) {
    var promise = new Promise(function (resolve, reject) {
      var roomAddresses = [];
      var counter = 0;
	  const fs = require('fs');
	  fs.truncate('./ui-react/build/roomlinks.txt', 0, function(){console.log('roomlinks.txt file cleared')});
	  fs.truncate('./ui-react/build/roomnames.txt', 0, function(){console.log('roomnames.txt file cleared')});
	  var ip = require("ip");
	  
      roomLists.forEach(function (item, i, array) {
        exch.GetRooms(new ews.Mailbox(item.Address)).then((rooms) => {
          rooms.forEach(function (roomItem, roomIndex, roomsArray) {
            // use either email var or roomItem.Address - depending on your use case
            let inBlacklist = isRoomInBlacklist(roomItem.Address);

            // if not in blacklist, proceed as normal; otherwise, skip
            if (!inBlacklist) {
              let room = {};
			  
              // if the email addresses != your corporate domain,
              // replace email domain with domain
              let email = roomItem.Address;
              email = email.substring(0, email.indexOf('@'));
              email = email + '@' + auth.domain;

              let roomAlias = roomItem.Name.toLowerCase().replace(/\s+/g, "-");
			  
			  //console.log(roomAlias);
			 // fs.appendFile('./ui-react/build/roomlinks.txt', 'http://'+ip.address()+':8080/single-room/' + roomAlias + '\r\n', function(err){
			  fs.appendFile('./ui-react/build/roomlinks.txt', 'http://localhost:8080/single-room/' + roomAlias + '\r\n', function(err){
				  if(err){
					  return console.log(err);
				  }
				  //console.log("Alias Saved");
			  });
			  fs.appendFile('./ui-react/build/roomnames.txt', roomItem.Name.toLowerCase() + '\r\n', function(err){
				  if(err){
					  return console.log(err);
				  }
				  //console.log("Alias Saved");
			  });
              room.Roomlist = item.Name;
              room.Name = roomItem.Name;
              room.RoomAlias = roomAlias;
              room.Email = email;
              roomAddresses.push(room);
			  //console.log(roomAddresses);
			  //console.log(room.Roomlist);
			  //console.log(room.Name);
            }
          });
          counter++;

          if (counter === array.length) {
            resolve(roomAddresses);
          }
        })
      });

    });
    return promise;
  };

  var fillRoomData = function (context, room, appointments = [], option = {}) {
    room.Appointments = [];
	
    appointments.forEach(function(appt, index) {
		
      // get start time from appointment
      var start = processTime(appt.Start.momentDate),
          end = processTime(appt.End.momentDate),
          now = Date.now();
	  
      room.Busy = index === 0
        ? start < now && now < end
        : room.Busy;
      let isAppointmentPrivate = appt.Sensitivity === 'Normal' ? false : true;

      let subject = isAppointmentPrivate ? 'Private' : appt.Subject;
	  console.log("Appointment Subject: " + subject);
      room.Appointments.push({
        "Subject" : subject,
        "Organizer" : appt.Organizer.Name,
        "Start" : start,
        "End"   : end,
        "Private" : isAppointmentPrivate
      });
    });

    if (option.errorMessage) {
      room.ErrorMessage = option.errorMessage;
    }

    context.itemsProcessed++;

    if (context.itemsProcessed === context.roomAddresses.length) {
      context.roomAddresses.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));
      context.callback(context.roomAddresses);
    }
  };

  // promise: get current or upcoming appointments for each room
  var getAppointmentsForRooms = function (roomAddresses) {
    var promise = new Promise(function (resolve, reject) {
      var context = {
        callback: resolve,
        itemsProcessed: 0,
        roomAddresses
      };
	  //console.log(roomAddresses);
      roomAddresses.forEach(function(room, index, array){
        var calendarFolderId = new ews.FolderId(ews.WellKnownFolderName.Calendar, new ews.Mailbox(room.Email));
		//console.log(calendarFolderId);
        var view = new ews.CalendarView(ews.DateTime.Now, new ews.DateTime(ews.DateTime.Now.TotalMilliSeconds + 576000000), 6);
		
		
        exch.FindAppointments(calendarFolderId, view).then((response) => {
			//console.log(room);
		  //console.log(response.Items);
          fillRoomData(context, room, response.Items);
        }, (error) => {
          // handle the error here
          // callback(error, null);
		  console.log(error);
          fillRoomData(context, room, undefined, { errorMessage: error.response.errorMessage });
        });
      });
    });
    return promise;
  };

  // check if room is in blacklist
  function isRoomInBlacklist(email) {
    return blacklist.roomEmails.includes(email);
  }

  // do all of the process for the appointment times
  function processTime(appointmentTime) {
    var time = JSON.stringify(appointmentTime);
    time = time.replace(/"/g,"");
    var time = new Date(time);
    var time = time.getTime();

    return time;
  }

  // perform promise chain to get rooms
  getListOfRooms()
  .then(getRoomsInLists)
  .then(getAppointmentsForRooms)
  .then(function(rooms){
      callback(null, rooms);
  });
};
