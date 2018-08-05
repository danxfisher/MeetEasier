import RoomStatusBlock from './RoomStatusBlock';

describe('RoomStatusBlock Component', () => {

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
            'Organizer':'Meeting Organizer',
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

  it('renders correctly', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders room.Name', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-name').text();
    expect(div).toBe('Test Room');
  });

  // room.Status tests

  it('renders "Busy" if room.Busy is true', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-status').text();
    expect(div).toBe('Busy');
  });

  it('renders "busy" class when room.Busy is true', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('.busy').exists();
    expect(div).toBeTruthy();    
  });

  it('renders "Open" if room.Busy is false', () => {
    room.Busy = false;
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__room-status').text();
    expect(div).toBe('Open');
  });

  it('renders "open" classes when room.Busy is true', () => {
    room.Busy = false;
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('.open').exists();
    expect(div).toBeTruthy();    
  });

  // /room.Status tests
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

    const div = wrapper.find('#single-room__details').text();
    expect(div).toBe('');
  });

  it('renders details.nextUp texts', () => {
    details.nextUp = 'Next up:';
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__next-up').text();
    expect(div).toBe('Next up:');
  });

  it('renders room.Appointments[0].Subject', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__meeting-subject').text();
    expect(div).toBe('Meeting Subject');
  });

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

    const div = wrapper.find('#single-room__meeting-time').text();
    expect(div).toBe('');
  })

  it('receives number from room.Appointments[0].Start', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const roomProps = wrapper.find('Time').props().room;
    expect(roomProps.Appointments[0].Start).toBeNumber(); 
  });

  it('receives number from room.Appointments[0].End', () => {
    const wrapper = shallow(<RoomStatusBlock room={room} details={details} config={config} />);

    const roomProps = wrapper.find('Time').props().room;
    expect(roomProps.Appointments[0].End).toBeNumber(); 
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
  });

  it('renders room.Appointments[0].Oragnizer', () => {
    const wrapper = mount(<RoomStatusBlock room={room} details={details} config={config} />);

    const div = wrapper.find('#single-room__meeting-organizer').text();
    expect(div).toBe('Meeting Organizer');
  });

  // /Organizer tests
});
