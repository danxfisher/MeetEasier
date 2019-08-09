module.exports = { 
	BookRoom: function (roomEmail, roomName, startTime, endTime) {
		var ews = require("ews-javascript-api");
		var auth = require("../../config/auth.js");
		//var ewsNTLM = require("ews-javascript-api-auth");//uncomment for NTLM (depricated)
		//ews.ConfigurationApi.ConfigureXHR(new ewsNTLM.ntlmAuthXhrApi(auth.exchange.username, auth.exchange.password, true));//uncomment for NTLM (depricated)
		const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
		exch.Credentials = new ews.WebCredentials(auth.exchange.username, auth.exchange.password);
		exch.Url = new ews.Uri(auth.exchange.uri);
		
		var promise = new Promise (function (resolve, reject) {
			var appointment = new ews.Appointment(exch);
			appointment.Subject = "Booked by Room Panel"
			appointment.Start = new ews.DateTime(startTime);
			appointment.End = new ews.DateTime(endTime);
			appointment.Location = roomName;
			appointment.Body = new ews.MessageBody(ews.BodyType.HTML, "Room Booked by Room Panel");
			appointment.RequiredAttendees.Add(roomEmail);

			appointment.Save(ews.SendInvitationsMode.SendToAllAndSaveCopy).then(() => {
				console.log("------------");
			}, (ei) => {
				console.log(ei.stack, ei.stack.split("\n"));
				console.log("error");
		    });
		})
		return promise;
	}
	
}