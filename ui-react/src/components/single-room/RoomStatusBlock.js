import React from 'react';
import PropTypes from 'prop-types';
//import {ExchangeService, ExchangeVersion} from "ews-javascript-api";
//var ews = require('ews-javascript-api');


const Details = ({room, details}) => (

  <div id="single-room__details">
    { details.appointmentExists &&
      <div id="single-room__meeting-title">
        <span id="single-room__next-up">
          {details.nextUp}
        </span>
        <span id="single-room__meeting-subject">
          {room.Appointments[0].Subject}
        </span>
      </div>
    }
  </div>
);

const Time = ({room, details}) => (
  <div id="single-room__meeting-time">
    { details.appointmentExists &&
      new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString([], {weekday: 'short', hour: '2-digit', minute: '2-digit'})
      + ' - ' + 
      new Date(parseInt(room.Appointments[0].End, 10)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }
  </div>
);

const Organizer = ({room, details}) => {
  return(
    <div id="single-room__meeting-organizer">
      {details.appointmentExists &&
        room.Appointments[0].Organizer
      }
    </div>
  );
};
function BookAfter(time, room, startTime){
  console.log("BOOK AFTER");
  var endTime = new Date(startTime.getTime() + time*60000);
  var roomEmail = room.Email;
  var roomName = room.Name;
  var data = {roomEmail:roomEmail, roomName:roomName, startTime:startTime, endTime:endTime};
  fetch(`../api/roombooking?roomEmail=${encodeURIComponent(data.roomEmail)}&roomName=${encodeURIComponent(data.roomName)}&startTime=${encodeURIComponent(data.startTime)}&endTime=${encodeURIComponent(data.endTime)}`);
  console.log("BOOKED");
  setTimeout(reloadPage, 5000);
}
function BookNow(time, room) {
  console.log("BOOK NOW");
  var startTime = new Date();
  var endTime = new Date(startTime.getTime() + time*60000);
  var roomEmail = room.Email;
  var roomName = room.Name;
  var data = {roomEmail:roomEmail, roomName:roomName, startTime:startTime, endTime:endTime};
  fetch(`../api/roombooking?roomEmail=${encodeURIComponent(data.roomEmail)}&roomName=${encodeURIComponent(data.roomName)}&startTime=${encodeURIComponent(data.startTime)}&endTime=${encodeURIComponent(data.endTime)}`);
  console.log("BOOKED");
  setTimeout(reloadPage, 5000);
}
function reloadPage(){
  window.location.reload();
}
function ButtonControl(props){
  let room = props.room;
  let details = props.details;
  var moment = require('moment');
  //try{
    if (room.Busy){
      let currentAppointmentEnd = new Date(parseInt(room.Appointments[0].End, 10));
      if (room.Appointments.length > 1){
        let nextAppointmentStart = new Date(parseInt(room.Appointments[1].Start, 10));
        
        currentAppointmentEnd = moment(currentAppointmentEnd);
        nextAppointmentStart = moment(nextAppointmentStart);
        let timeDifference = nextAppointmentStart.diff(currentAppointmentEnd, 'minutes')
        if (timeDifference > 120){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("30", room, currentAppointmentEnd)}} id="bookAfterButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("60", room, currentAppointmentEnd)}} id="bookAfterButton1h">1 Hour</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("120", room, currentAppointmentEnd)}} id="bookAfterButton2h">2 Hours</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 60){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("30", room, currentAppointmentEnd)}} id="bookAfterButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("60", room, currentAppointmentEnd)}} id="bookAfterButton1h">1 Hour</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 45){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("30", room, currentAppointmentEnd)}} id="bookAfterButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("45", room, currentAppointmentEnd)}} id="bookAfterButton45">45 Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 30){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter("30", room, currentAppointmentEnd)}} id="bookAfterButton30">30 Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 15){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookAfter(timeDifference, room, currentAppointmentEnd)}} id="bookAfterButtonTD">{timeDifference} Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference >= 5){
          return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookAfter(timeDifference, room, currentAppointmentEnd)}} id="bookAfterButtonTD">{timeDifference} Minutes</button></td>
            </tr></table></div>
          );
        }
        else {
          return (<div> <h4> Room is unavailable </h4></div>);
        }
      }
      else
      {
        return (<div> <h4> Extend/Book after this meeting Now: </h4><table width='100%'>
          <tr>
            <td><button type="button" class="btn" onClick={e => {BookAfter("15", room, currentAppointmentEnd)}} id="bookAfterButton15">15 Minutes</button></td>
            <td><button type="button" class="btn" onClick={e => {BookAfter("30", room, currentAppointmentEnd)}} id="bookAfterButton30">30 Minutes</button></td>
            <td><button type="button" class="btn" onClick={e => {BookAfter("60", room, currentAppointmentEnd)}} id="bookAfterButton1h">1 Hour</button></td>
            <td><button type="button" class="btn" onClick={e => {BookAfter("120", room, currentAppointmentEnd)}} id="bookAfterButton2h">2 Hours</button></td>
          </tr></table></div>
        );
      }
    }
    else {
      if (room.Appointments.length > 0){
        let now = new Date();
        console.log("DATETIMENOW = " + now);
        let nextAppointmentStart = new Date(parseInt(room.Appointments[0].Start, 10));
        now = moment(now);
        console.log("DATETIMENOW2 = " + now);
        nextAppointmentStart = moment(nextAppointmentStart);

        let timeDifference = nextAppointmentStart.diff(now, 'minutes')
        if (timeDifference > 120){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}} id="bookNowButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("30", room)}} id="bookNowButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("60", room)}} id="bookNowButton1h">1 Hour</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("120", room)}} id="bookNowButton2h">2 Hours</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 60){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}}>15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("30", room)}} id="bookNowButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("60", room)}} id="bookNowButton1h">1 Hour</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 45){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}} id="bookNowButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("30", room)}} id="bookNowButton30">30 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("45", room)}} id="bookNowButton45">45 Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 30){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}} id="bookNowButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow("30", room)}} id="bookNowButton30">30 Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference > 15){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}} id="bookNowButton15">15 Minutes</button></td>
              <td><button type="button" class="btn" onClick={e => {BookNow(timeDifference, room)}} id="bookNowButtonTD">{timeDifference} Minutes</button></td>
            </tr></table></div>
          );
        }
        else if (timeDifference >= 5){
          return (<div> <h4> Book This Room Now: </h4><table width='100%'>
            <tr>
              <td><button type="button" class="btn" onClick={e => {BookNow(timeDifference, room)}} id="bookNowButtonTD">{timeDifference} Minutes</button></td>
            </tr></table></div>
          );
        }
        else {
          return (<div> <h4> Room is unavailable before next booking.</h4></div>);
        }
      }
      else
      {
        return (<div> <h4> Book This Room Now: </h4><table width='100%'>
          <tr>
            <td><button type="button" class="btn" onClick={e => {BookNow("15", room)}} id="bookNowButton15">15 Minutes</button></td>
            <td><button type="button" class="btn" onClick={e => {BookNow("30", room)}} id="bookNowButton30">30 Minutes</button></td>
            <td><button type="button" class="btn" onClick={e => {BookNow("60", room)}} id="bookNowButton1h">1 Hour</button></td>
            <td><button type="button" class="btn" onClick={e => {BookNow("120", room)}} id="bookNowButton2h">2 Hours</button></td>
          </tr></table></div>
        );
      }
    }
  //}
  //catch (TypeError){
  //  setTimeout(reloadPage, 2000);
  //}
}
const RoomStatusBlock = ({ config, details, room }) => (
  <div className={room.Busy ? 'columns small-8 left-col busy' : 'columns small-8 left-col open'}>
  <table id="single-room__logo-name-table">
    <tr><td id="single-room__org-logo-td">
    <div id="single-room__org-logo">
      <img src="../img/logo2.png" alt="Logo" id="single-room__org-logo__img" />
    </div>
    </td>
    <td>
    <div id="single-room__room-name">{room.Name}</div>
    </td></tr>
    </table>
    <div id="single-room__room-status">{room.Busy ? config.statusBusy : config.statusAvailable}</div>
    
      <ButtonControl room={room} details={details}/>
      <Details room={room} details={details} />
      <Time room={room} details={details} />
      <Organizer room={room} details={details} />
    
  </div>
);

RoomStatusBlock.propTypes = {
  room: PropTypes.object.isRequired,
  details: PropTypes.object,
  config: PropTypes.object
}

export default RoomStatusBlock;

