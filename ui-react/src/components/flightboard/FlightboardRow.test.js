import FlightboardRow from './FlightboardRow';
import { MemoryRouter } from 'react-router-dom';

describe('Flightboard Row', () => {
  const room = {
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

  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('displays busy when room.Busy is true', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const busy = wrapper.find('.meeting-busy').exists();
    expect(busy).toBeTruthy();
  });

  it('displays open when room.Busy is false', () => {
    room.Busy = false;

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const open = wrapper.find('.meeting-open').exists();
    expect(open).toBeTruthy();
  });

  it('displays an error when room.ErrorMessage exists', () => {
    room.ErrorMessage = 'Houston, we have a problem.';

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <FlightboardRow room={room} filter='' />
      </MemoryRouter>
    );

    const error = wrapper.find('.meeting-error').exists();
    expect(error).toBeTruthy();
  });

  it('adds filter class based on roomlist', () => {
    const wrapper = shallow(<FlightboardRow room={room} filter='test-roomlist' />);

    const filterApplied = wrapper.find('.roomlist-test-roomlist').exists();
    expect(filterApplied).toBeTruthy();
  });
});
