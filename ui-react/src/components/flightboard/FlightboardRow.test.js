import FlightboardRow from './FlightboardRow';
import * as config from '../../config/flightboard.config.js';
import { MemoryRouter } from 'react-router-dom';

describe('Flightboard Row Component', () => {
  let room;

  beforeEach(() => {
    room = {
      'Roomlist':'Test Roomlist',
      'Name':'Test Room',
      'RoomAlias':'test-room',
      'Email':'email@email.com',
      'Appointments':[
         {
            'Subject':'Meeting Subject',
            'Organizer':'John Doe',
            'Start':1532966400000,
            'End':1533344400000
         }
      ],
      'Busy':true
    };
  });

  // all room.*

  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  // roomStatusClass

  it('renders correct roomStatusClass when room.Busy is false', () => {
    room.Busy = false;
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const div = wrapper.find('.test-room .meeting-room .meeting-room-busy').exists();
    expect(div).not.toBeTruthy();
  });

  it('renders correct roomStatusClass when room.Busy is true', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const div = wrapper.find('.test-room .meeting-room .meeting-room-busy').exists();
    expect(div).toBeTruthy();
  });

  it('renders correct roomStatusClass when room.ErrorMessage is not empty', () => {
    room.ErrorMessage = 'Houston, we have a problem.';
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const div = wrapper.find('.test-room .meeting-room .meeting-room-error').exists();
    expect(div).toBeTruthy();
  });

  // /roomStatusClass
  // Status tests

  it('renders Status', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const status = wrapper.find('Status').exists();
    expect(status).toBeTruthy();
  });

  it('renders correct statusClass when room.Busy is false', () => {
    room.Busy = false;
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const div = wrapper.find('.meeting-open').exists();
    expect(div).toBeTruthy();
  });

  it('renders correct statusClass when room.Busy is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const div = wrapper.find('.meeting-busy').exists();
    expect(div).toBeTruthy();
  });

  it('renders correct statusClass when room.ErrorMessage is not empty', () => {
    room.ErrorMessage = 'Houston, we have a problem.';
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const div = wrapper.find('.meeting-error').exists();
    expect(div).toBeTruthy();
  });

  it('renders statusText correctly when room.Busy is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const status = wrapper.find('.test-room-meeting-status').text();
    expect(status).toBe(config.board.statusBusy);
  });

  it('renders statusText correctly when room.Busy is false', () => {
    room.Busy = false;
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const status = wrapper.find('.test-room-meeting-status').text();
    expect(status).toBe(config.board.statusAvailable);
  });

  it('renders statusText correctly when room.ErrorMessage is not empty', () => {
    room.ErrorMessage = 'Houston, we have a problem.';
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const status = wrapper.find('.test-room-meeting-status').text();
    expect(status).toBe(config.board.statusError);
  });

  it('displays busy when room.Busy is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const busy = wrapper.find('.meeting-busy').exists();
    expect(busy).toBeTruthy();
  });

  it('displays open when room.Busy is false', () => {
    room.Busy = false;

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const open = wrapper.find('.meeting-open').exists();
    expect(open).toBeTruthy();
  });

  it('displays an error when room.ErrorMessage exists', () => {
    room.ErrorMessage = 'Houston, we have a problem.';

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const error = wrapper.find('.meeting-error').exists();
    expect(error).toBeTruthy();
  });

  // /Status tests
  // Subject tests

  it('renders Subject', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const subject = wrapper.find('Subject').exists();
    expect(subject).toBeTruthy();
  });

  it('renders Subject empty if appointments do not exists', () => {
    room.Appointments = [];

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const subject = wrapper.find('Subject').text();
    expect(subject).toEqual('');
  });

  it('renders correct meeting subject based on room.Appointments[0].Subject', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const subject = wrapper.find('.meeting-subject').text();
    expect(subject).toBe(room.Appointments[0].Subject);
  });

  // /Subject tests
  // Time tests

  it('renders Time', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const time = wrapper.find('Time').exists();
    expect(time).toBeTruthy();
  });

  it('renders Time empty if appointments do not exists', () => {
    room.Appointments = [];

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const time = wrapper.find('Time').text();
    expect(time).toEqual('');
  });

  it('receives number from room.Appointments[0].Start', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const roomProps = wrapper.find('Time').props().room;
    expect(roomProps.Appointments[0].Start).toBeNumber(); 
  });

  it('receives number from room.Appointments[0].End', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const roomProps = wrapper.find('Time').props().room;
    expect(roomProps.Appointments[0].End).toBeNumber(); 
  });

  // /Time tests
  // Organizer tests

  it('renders Organizer', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const organizer = wrapper.find('Organizer').exists();
    expect(organizer).toBeTruthy();
  });

  it('renders Organizer empty if appointments do not exists', () => {
    room.Appointments = [];

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const organizer = wrapper.find('Organizer').text();
    expect(organizer).toEqual('');
  });

  // /Organizer tests
  // FullScreenIcon tests

  it('renders FullScreenIcon Link', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const link = wrapper.find('.meeting-fullscreen a .fi-monitor').exists();
    expect(link).toBeTruthy();
  });

  it('does not render FullScreenIcon Link if room.ErrorMessage exists', () => {
    room.ErrorMessage = 'Houston, we have a problem.';

    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const link = wrapper.find('.meeting-fullscreen a .fi-monitor').exists();
    expect(link).toBeFalsy();
  });

  // /FullScreenIcon tests

  it('adds filter class based on roomlist', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='test-roomlist' />);

    const filterApplied = wrapper.find('.roomlist-test-roomlist').exists();
    expect(filterApplied).toBeTruthy();
  });
});
