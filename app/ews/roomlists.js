module.exports = function (callback) {

  // modules -------------------------------------------------------------------
  var ews = require("ews-javascript-api");
  var auth = require("../../config/auth/auth.js");
  //if NTLM
  require('dotenv').config()
  //console.log(".env = " + process.env.REACT_APP_EnableNTLM);
  if (process.env.REACT_APP_EnableNTLM=="true") {
    var ewsNTLM = require("ews-javascript-api-auth");
    ews.ConfigurationApi.ConfigureXHR(new ewsNTLM.ntlmAuthXhrApi(auth.exchange.username, auth.exchange.password, true));
  }
  //
  // ews -----------------------------------------------------------------------
  const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
  exch.Credentials = new ews.WebCredentials(auth.exchange.username, auth.exchange.password);
  exch.Url = new ews.Uri(auth.exchange.uri);


  // get roomlists from EWS and return sorted array of room list names
  exch.GetRoomLists().then((lists) => {
    var roomLists = [];
    lists.items.forEach(function (item, i, array) {
      roomLists.push(item.Name);
    });
    callback(null, roomLists.sort());
  }, (err) => {
    callback(err, null);
  });

};
