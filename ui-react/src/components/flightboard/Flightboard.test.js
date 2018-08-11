import Flightboard from './Flightboard';

describe('Flightboard component', () => {

  beforeEach(() => {
    Flightboard.prototype.getRoomData = jest.fn();
    Flightboard.prototype.handleSocket = jest.fn();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Flightboard />);
    wrapper.state({ response: true, error: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {

  });

  it('calls getRoomData', () => {
    const wrapper = shallow(<Flightboard />);

    const instance = wrapper.instance();
    const getRoomData = jest.spyOn(instance, 'getRoomData');
    
    // instance.getRoomData();
    expect(getRoomData).toHaveBeenCalled();
  });

  it('calls handleSocket', () => {
    const wrapper = shallow(<Flightboard />);

    const instance = wrapper.instance();
    const handleSocket = jest.spyOn(instance, 'handleSocket');
    
    instance.handleSocket('foo');
    expect(handleSocket).toHaveBeenCalledWith('foo');
  });

  it('renders Spinner component if response is false', () => {
    const wrapper = shallow(<Flightboard />);

    const spinner = wrapper.find('Spinner').exists();
    expect(spinner).toBeTruthy();
  });

  it('renders credentials error if response is true and error is true', () => {
    const wrapper = shallow(<Flightboard />);
    wrapper.state({ 
      response: true, 
      error: true,
      rooms: {
        'error':'Credentials error'
      }
    });

    const error = wrapper.find('.credentials-error').exists();
    expect(error).not.toBeTruthy();
  });

  // it('renders credentials error if response is true and error is true', () => {
  //   const wrapper = shallow(<Flightboard />);
  //   wrapper.state({ 
  //     response: true, 
  //     error: true,
  //     rooms: [{
  //       'Roomlist':'Test Roomlist',
  //       'Name':'Test Room',
  //       'RoomAlias':'test-room',
  //       'Email':'email@email.com',
  //       'Appointments':[
  //          {
  //             'Subject':'Meeting Subject',
  //             'Organizer':'John Doe',
  //             'Start':1532966400000,
  //             'End':1533344400000
  //          }
  //       ],
  //       'Busy':true
  //     }]
  //   });

  //   const error = wrapper.find('.credentials-error').exists();
  //   expect(error).not.toBeTruthy();
  // });
});