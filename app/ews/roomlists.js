module.exports = function (callback) {

  // modules -------------------------------------------------------------------
  var ews = require("ews-javascript-api");
  var auth = require("../../config/auth.js");

  // ews -----------------------------------------------------------------------
  var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2016);
  exch.Credentials = new ews.ExchangeCredentials(auth.exchange.username, auth.exchange.password);
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
