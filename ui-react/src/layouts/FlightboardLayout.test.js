import FlightboardLayout from './FlightboardLayout';

describe('FlightboardLayout Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FlightboardLayout />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders Navbar component', () => {
    const wrapper = shallow(<FlightboardLayout />);

    const component = wrapper.find('Navbar').exists();
    expect(component).toBeTruthy();
  });

  it('renders Navbar component props', () => {
    const wrapper = shallow(<FlightboardLayout />);

    const component = wrapper.find('Navbar').props().filter;
    expect(component).toBeTruthy();
  });

  it('operates filter callback function correctly', () => {
    let mockFn = jest.fn();
    FlightboardLayout.prototype.handleFilter = mockFn;

    const wrapper = shallow(<FlightboardLayout />);
    wrapper.find('Navbar').prop('filter')('foo');
    wrapper.setState({ filter: 'foo' });

    // wrapper.find('Navbar').simulate('filter', 'foo');
    const state = wrapper.instance().state;
    expect(state).toEqual({ filter: 'foo' });

    expect(mockFn).toHaveBeenCalledWith('foo');
  });

  it('renders Flightboard component', () => {
    const wrapper = shallow(<FlightboardLayout />);

    const component = wrapper.find('Flightboard').exists();
    expect(component).toBeTruthy();
  });

  it('renders Flightboard component filter prop based on state', () => {
    const wrapper = shallow(<FlightboardLayout />);
    wrapper.setState({ filter: 'foo' });

    const component = wrapper.find('Flightboard').props().filter;
    expect(component).toBeTruthy();
  });
});
