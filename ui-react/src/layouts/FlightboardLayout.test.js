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

  it('calls handleFilter and sets state', () => {
    const wrapper = shallow(<FlightboardLayout />);

    let mockFn = jest.fn();
    FlightboardLayout.prototype.handleFilter = mockFn;

    const instance = wrapper.instance();
    const handleFilter = jest.spyOn(instance, 'handleFilter');
    
    instance.handleFilter('foo');

    expect(wrapper.state('filter')).toBe('foo');
    expect(handleFilter).toHaveBeenCalledWith('foo');
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
