module.exports = { 
	BookRoom: function (roomEmail, roomName, startTime, endTime, bookingType) {
		var ews = require("ews-javascript-api");
		var auth = require("../../config/auth/auth.js");
		var moment = require('moment');
		//if NTLM
		require('dotenv').config()
		//console.log(".env = " + process.env.REACT_APP_EnableNTLM);
		if (process.env.REACT_APP_EnableNTLM=="true") {
			var ewsNTLM = require("ews-javascript-api-auth");
		ews.ConfigurationApi.ConfigureXHR(new ewsNTLM.ntlmAuthXhrApi(auth.exchange.username, auth.exchange.password, true));
		}
		const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
		exch.Credentials = new ews.WebCredentials(auth.exchange.username, auth.exchange.password);
		exch.Url = new ews.Uri(auth.exchange.uri);
		//ews.EwsLogging.DebugLogEnabled = true;
		if ((bookingType === 'BookNow') || (bookingType === 'BookAfter')){
			console.log("BookNow/BookAfter");
			var promise = new Promise (function (resolve, reject) { 
				var appointment = new ews.Appointment(exch);
				appointment.Subject = "Booked by Meet-Easier";
				appointment.Start = new ews.DateTime(startTime);
				appointment.End = new ews.DateTime(endTime);
				console.log("RoomBooking: " +appointment.Start + " | " + appointment.End);
				appointment.Location = roomName;
				appointment.Body = new ews.MessageBody(ews.BodyType.HTML, "Room Booked by Room Panel");
				appointment.RequiredAttendees.Add(roomEmail);
				let mode = ews.SendInvitationsMode.SendToAllAndSaveCopy
				appointment.Save(mode).then(() => {
					console.log("Appointment Saved");
				}, (ei) => {
					console.log(ei.stack, ei.stack.split("\n"));
					console.log("error");
				});
			})
			promise.then(function(result){
				console.log("SUCCESS");
			}, function(err){
				console.log(err);
			});
		}
		else if ((bookingType === 'Extend') || (bookingType === 'EndNow')){
			var calendarFolderId = new ews.FolderId(ews.WellKnownFolderName.Calendar, new ews.Mailbox(roomEmail));
		   	var view = new ews.CalendarView(ews.DateTime.Now, new ews.DateTime(ews.DateTime.Now.TotalMilliSeconds + 576000000), 6);
	        exch.FindAppointments(calendarFolderId, view).then((response) => {
				var appointments = response.Items;
				console.log(bookingType+":START");
				appointments.forEach(function(appt, index) {
		
					// get start time from appointment
					var start = processTime(appt.Start.momentDate),
						end = processTime(appt.End.momentDate),
						now = Date.now();
						
					console.log(start);
					var apptStartewsDT = new ews.DateTime(new Date(parseInt(start, 10)));
					var apptStartTime = moment(start).toISOString();
					if (apptStartTime === startTime){
						var promise = new Promise (function (resolve, reject) { 
							
							appt.End = new ews.DateTime(endTime);
							let SIOCmode = ews.SendInvitationsOrCancellationsMode.SendToAllAndSaveCopy;
							let CRmode = ews.ConflictResolutionMode.AlwaysOverwrite
							appt.Update(CRmode, SIOCmode).then(() => {
								console.log("Appointment Saved");
							}, (ei) => {
								console.log(ei.stack, ei.stack.split("\n"));
								console.log("error");
							});
						})
						promise.then(function(result){
							console.log(result);
						}, function(err){
							console.log(err);
						});
					}

					
            	}	, (error) => {
          		// handle the error here
          	// callback(error, null);
		  			console.log(error);
				});
			});
		}
		function processTime(appointmentTime) {
			var time = JSON.stringify(appointmentTime);
			time = time.replace(/"/g,"");
			var time = new Date(time);
			var time = time.getTime();
		
			return time;
		}  
	}
	
	
}
