import Navbar from './Navbar';

describe('Flightboard Navbar', () => {
  let mockFilter, wrapper;

  beforeEach(() => {
    mockFilter = jest.fn();
    wrapper = shallow(<Navbar filter={mockFilter} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders navbar-title with text', () => {
    const title = wrapper.find('#fb__navbar-title').text();

    expect(title).not.toBeEmpty();
  });

  it('renders RoomFilterContainer component correctly', () => {
    const filter = wrapper.find('RoomFilterContainer').exists();

    expect(filter).toBeTruthy();
  });

  it('renders Clock component correctly', () => {
    const clock = wrapper.find('Clock').exists();

    expect(clock).toBeTruthy();
  });

  it('operates filter callback function correctly', () => {
    wrapper.find('RoomFilterContainer').prop('filter')('foo');

    expect(mockFilter).toHaveBeenCalledWith('foo');
  });
});
