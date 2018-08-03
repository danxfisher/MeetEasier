import RoomStatusBlock from './RoomStatusBlock';

describe('COMPONENT', () => {
  let room, details, config;
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

    details = {
      appointmentExists: true,
      nextUp: ''
    };

    config = {
      statusBusy: 'Busy',
      statusAvailable: 'Open'
    };
  });

  // *********************************
  // change to shallow when finished 
  // and remove this comment
  // *********************************
  it('renders correctly', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders room.Name', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-name').text();
    expect(div).toBe('Test Room');
  })

  it('renders "Busy" if room.Busy is true', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-status').text();
    expect(div).toBe('Busy');
  });

  it('renders "Open" if room.Busy is false', () => {
    room.Busy = false;
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-status').text();
    expect(div).toBe('Open');
  });

  // Details tests

  it('renders Details', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const component = wrapper.find('Details').exists();
    expect(component).toBeTruthy();
  });

  it('renders Details with text if appointment exists', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__details').text();
    expect(div).not.toBe('');
  });

  it('renders Details blank if appointment does not exist', () => {
    details.appointmentExists = false;
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div= wrapper.find('#single-room__details').text();
    expect(div).toBe('');
  })

  // /Details tests
  // Time tests

  it('renders Time', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const component = wrapper.find('Time').exists();
    expect(component).toBeTruthy();
  });

  it('renders Time with text if appointment exists', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__meeting-time').text();
    expect(div).not.toBe('');
  });

  it('renders Time blank if appointment does not exist', () => {
    details.appointmentExists = false;
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div= wrapper.find('#single-room__meeting-time').text();
    expect(div).toBe('');
  })

  // /Time tests
  // Organizer tests

  it('renders Organizer', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const component = wrapper.find('Organizer').exists();
    expect(component).toBeTruthy();
  });

  it('renders Organizer with text if appointment exists', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__meeting-organizer').text();
    expect(div).not.toBe('');
  });

  it('renders Organizer blank if appointment does not exist', () => {
    details.appointmentExists = false;
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div= wrapper.find('#single-room__meeting-organizer').text();
    expect(div).toBe('');
  })

  // /Organizer tests
});
