import Navbar from './Navbar';

describe('Flightboard Navbar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Navbar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders roomfilter component correctly', () => {
    const wrapper = shallow(<Navbar />);
    const filter = wrapper.find("RoomFilter");

    expect(filter).toBeDefined();
  });

  it('renders clock component correctly', () => {
    const wrapper = shallow(<Navbar />);
    const clock = wrapper.find("Clock");

    expect(clock).toBeDefined();
  });

  it('operates filter callback function correctly', () => {
    const filterAction = jest.fn();
    const wrapper = shallow(<Navbar filter={filterAction} />);

    wrapper.find('RoomFilter').prop('filter')('foo');

    expect(filterAction).toHaveBeenCalledWith('foo');
  });
});
