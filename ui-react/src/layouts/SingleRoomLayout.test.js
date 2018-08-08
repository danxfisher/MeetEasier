import SingleRoomLayout from './SingleRoomLayout';


describe('SingleRoomLayout Component', () => {
  let props, wrapper;;
  beforeEach(() => {
    props = {
      match: {
        params: {
          name: 'test-room'
        }
      }
    };

    wrapper = shallow(<SingleRoomLayout {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Display component if roomAlias exists', () => {
    const component = wrapper.find('Display').exists();
    expect(component).toBeTruthy();
  });

  it('renders Display component props correctly', () => {
    const alias = wrapper.find('Display').props().alias;
    expect(alias).toEqual(props.match.params.name);
  })

  it('renders NotFound if roomAlias does not exists', () => {
    wrapper.setState({ roomAlias: '' });

    const component = wrapper.find('NotFound').exists();
    expect(component).toBeTruthy();
  });
});