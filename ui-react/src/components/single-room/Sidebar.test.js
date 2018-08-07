import Sidebar from './Sidebar';
import * as config from '../../config/singleRoom.config.js';

describe('Sidebar Component', () => {

  let room, details;
  
  beforeEach(() => {
    room = {
      'Roomlist':'Test Roomlist',
      'Name':'Test Room',
      'RoomAlias':'test-room',
      'Email':'email@email.com',
      'Appointments':[
         {
            'Subject':'Meeting Subject',
            'Organizer':'Meeting Organizer',
            'Start':1532966400000,
            'End':1533344400000
         },
         {
          'Subject':'Meeting Two Subject',
          'Organizer':'Meeting Two Organizer',
          'Start':1532966400000,
          'End':1533344400000
       },
      ],
      'Busy':true
    };

    details = {
      appointmentExists: true,
      upcomingAppointments: false,
      nextUp: ''
    };
  });

  // item.Start
  // item.End

  it('renders correctly', () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders Clock component', () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const component = wrapper.find('Clock').exists();
    expect(component).toBeTruthy();
  });

  it('renders upcomingTitle according to config file', () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const div = wrapper.find('#upcoming-title').text();
    expect(div).toBe(config.upcomingTitle);
  });

  it('renders a table row if details.upcomingAppointments is true', () => {
    details.upcomingAppointments = true;
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const table = wrapper.find('table').text();
    expect(table).not.toBeEmpty();
  });

  it('does not render a table row if details.upcomingAppointments is false', () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const table = wrapper.find('table').text();
    expect(table).toBeEmpty();
  });

  it('renders room.Appointments[1].Subject when details.upcomingAppoints is true' , () => {
    details.upcomingAppointments = true;
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const div = wrapper.find('.up__meeting-title').text();
    expect(div).toBe(room.Appointments[1].Subject);
  });

  it('does not render room.Appointments[1].Subject when details.upcomingAppoints is false' , () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const div = wrapper.find('.up__meeting-title').exists();
    expect(div).toBeFalsy();
  });

  it('renders meeting time when details.upcomingAppoints is true' , () => {
    details.upcomingAppointments = true;
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const div = wrapper.find('.up__meeting-time').text();
    expect(div).not.toBeEmpty();
  });

  it('does not render meeting time when details.upcomingAppoints is false' , () => {
    const wrapper = shallow(<Sidebar room={room} details={details} config={config} />);

    const div = wrapper.find('.up__meeting-time').exists();
    expect(div).toBeFalsy();
  });
});
