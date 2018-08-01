import FlightboardRow from './FlightboardRow';

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

  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders Status', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='' />);

    const status = wrapper.find('Status').exists();
    expect(status).toBeTruthy();
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

  it('adds filter class based on roomlist', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='test-roomlist' />);

    const filterApplied = wrapper.find('.roomlist-test-roomlist').exists();
    expect(filterApplied).toBeTruthy();
  });
});
