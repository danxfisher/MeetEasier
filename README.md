# MeetEasier

Because why pay money for something you can do yourself?

## Description

MeetEasier is a web application that visualizes meeting room availability.  It works using Exchange Web Services (EWS) with Exchange room lists in Office 365.

![Mockup 1](mockups/mockup-1.jpg)

***

## License

MeetEasier is licensed under the open source [GNU General Public License (GPL 3.0)](https://github.com/danxfisher/MeetEasier/blob/master/LICENSE).

In the event of wanting to commercially distribute a closed source modification of this code, please contact me.

***

## Updates

* v0.2
  * Changed domain to accept more than just ".com" extension
  * Changed `ui-react/config/flightboard.config.js` to handle all text so that the application can be multilingual
  * Added `ui-react/config/singleRoom.config.js` to do the same for the `single-room` component
  * Added `console.log` to `server.js` to know when the server is running correctly
  * Updated styles slightly
* v0.1
  * Initial release

***

## Assumptions

This application assumes you have:

* Exchange Online (Office 365)
* Conference room mailboxes organized in room lists
* Exchange Web Services (EWS) enabled
* A service account with access to all conference room mailboxes and EWS
* A web server with Node.js installed to run the application

***

## Installation

1. *Optional*: Install IISNode
    * I've also included a `web.config` file for an IIS install
2. In root directory, open a terminal or cmd:
    ```
    $ npm install
    ```
3. Navigate to `ui-react/`. In the `package.json` file, change:
    ```
    "proxy" : "http://localhost:8080"
    ```
    to whatever the IP of where express is running.  Typically you can use something similar to the default but you can change the IP and port as long as it coincides with what is in `server.js`.
4. In the root directory, open a terminal or cmd:
    ```
    $ npm run build
    ```
5. In the root directory, open a terminal or cmd:
    ```
    $ npm start
    ```
6. If you want to start the react development server, in the root directory run:
    ```
    $ npm start-ui-dev
    ```

***

## Root Folder Structure Explained

* `app/` : Routes for EWS APIs
* `config/` : All EWS functionality
* `scss/` : All styles
* `static/` : All global static files
* `ui-react/` : Front end React routes and components

***

## React /src Folder Structure Explained

There are three main directories in the `ui-react/src/` folder:

* `components/` : Components separated in folders by function
* `config/` : Customizable config file (see defails below in Customization section)
* `layouts/` : Layout components for the two different layouts used.

### Components

* `flightboard/` : All components related to the flightboard or "all meeting" layout
* `global` : Components that will be used by both layouts
* `single-room` : All components related to the Single Room layout

#### components/flightboard/

* `board/` : Actual flightboard component itself
* `clock/` : Clock component for the upper right hand of the display
* `navbar/` : Top navigation/title bar piece
* `room-filter/` : Room list filter in the navbar

#### components/global/

* `not-found/` : A "not found" page if an error or "404" occurs
* `socket/` : A service component to run the web socket connection for updating the flightboard and single room display

#### components/single-room/

* `clock/` : Clock component for the upper right hand of the display
* `display/` : All other features of the single room display

### Config

* `flightboard.config.js` : Simple customization config explained in the Customization section

### Layouts

* `flightboard/` : Layout for flightboard display
* `single-room/` : Layout for single room display

***

## Customization

### Simple

* In `/config/auth.js`, enter your credentials and domain:

    ```javascript
    module.exports = {
      // this user MUST have full access to all the room accounts
      'exchange' : {
        'username'  : 'SVCACCT_EMAIL@DOMAIN.COM',
        'password'  : 'PASSWORD',
        'uri'       : 'https://outlook.office365.com/EWS/Exchange.asmx'
      },
      'domain' : 'DOMAIN'
    };
    ```

* Alternatively, username, password and domain can be set as environment variable

    ```bash
    export USERNAME=svcacct_email@domain.com
    export PASSWORD=password
    export DOMAIN=domain.com
    ```

* In `/ui-react/src/config/flightboard.config.js`, manage your customizations:

    ```javascript
    module.exports = {
        'title' : 'Conference Room Availability',
        'filterTitle' : 'Locations',
        'filterAllTitle' : 'All Conference Rooms',
        'roomsToSkip' : [
          'ROOM_EMAIL@DOMAIN.COM'
        ],
        'socketEndpoint' : 'http://localhost:8080'
    };
    ```

* Upload your logo to `/static/img/logo.png`

### Advanced

* All EWS functionality is located in `config/ews`.
* To change the interval in which the web socket emits, edit the interval time in `config/controller.js`.  By default, it is set to 1 minute.
* To update styles, make sure you install grunt first with `npm install -g grunt-cli`.  Then run `grunt` in the root directory to watch for SCSS changes.  Use the `.scss` files located in the `/scss` folder.
  * All React components can be locally styled by adding a new `.css` file and importing it into the component itself if you'd prefer to do it that way.
* In `config/ews/rooms.js`, there is a block of code on lines 37-39 that may not be necessary but were added as a convenience.  Feel free to use it, comment it out, or remove it completely.  It was designed for a use case where the email addresses (ex: jsmith@domain.com) do not match the corporate domain (ex: jsmith-enterprise).
    ```javascript
    // if the email domain != your corporate domain,
    // replace email domain with domain from auth config
    var email = roomItem.Address;
    email = email.substring(0, email.indexOf('@'));
    email = email + '@' + auth.domain + '.com';
    ```

***

## Flightboard Layout Mockup

![Mockup 3](mockups/mockup-3.jpg)

## Single Room Layout Mockup

![Mockup 2](mockups/mockup-2.jpg)

***

## Resources & Attributions

* [ews-javascript-api](https://github.com/gautamsi/ews-javascript-api)
* Mockup Images:
  * https://www.anthonyboyd.graphics/mockups/2017/realistic-ipad-pro-mockup-vol-3/
  * https://www.freepik.com/free-psd/business-meeting-with-tv-mockup_1163371.htm
  * https://www.freepik.com/free-psd/samsung-tv-mockup_800771.htm
