import RoomFilter from './RoomFilter';

describe('Flightboard RoomFilter', () => {
  let mockFilter, props, roomlists;

  beforeEach(() => {
    mockFilter = sinon.spy();
    props = {
      response: true,
      error: false,
      roomlists: [
        'Roomlist Number One',
        'Roomlist Number Two'
      ]
    }
  });

  // filterTitle - test .current-filter
  // filterAllTitle - roomlist-all


  it('renders correctly', () => {
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders filterTitle', () => {
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const filterTitle = wrapper.find('.current-filter').text();
    expect(filterTitle).not.toBeEmpty();
  });

  it('renders filterAllTitle', () => {
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const filterAllTitle = wrapper.find('#roomlist-all').text();
    expect(filterAllTitle).not.toBeEmpty();
  });

  it('renders "loading" in list if response is false and error is false', () => {
    props.response = false;
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const loading = wrapper.find('#roomlist__loading').exists();
    expect(loading).toBeTruthy();
  });

  it('renders "loading" in list if response is true and error is true', () => {
    props.error = true;
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const loading = wrapper.find('#roomlist__loading').exists();
    expect(loading).toBeTruthy();
  });

  it('renders "loading" in list if response is false and error is true', () => {
    props.error = true;
    props.response = false;
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const loading = wrapper.find('#roomlist__loading').exists();
    expect(loading).toBeTruthy();
  });

  it('does not render "loading" in list if response is true and error is false', () => {
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);

    const loading = wrapper.find('#roomlist__loading').exists();
    expect(loading).toBeFalsy();
  });

  it('list renders with three children', () => {
    const wrapper = shallow(<RoomFilter {...props} filter={mockFilter} />);
    const listItems = wrapper.find('.fb__child-dropdown').children();

    expect(listItems).toHaveLength(3);
  });

  it('operates filter callback function correctly when clicked', () => {
    const wrapper = mount(<RoomFilter {...props} filter={mockFilter} />);
    wrapper.find('#roomlist-all').simulate('click', {target: {id: 'foo'}});

    expect(mockFilter.calledOnce).toBe(true);
  });
});
