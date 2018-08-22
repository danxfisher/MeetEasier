import NotFound from './NotFound';

describe('NotFound component', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders error-text', () => {
    const div = wrapper.find('#error-text').exists();
    expect(div).toBeTruthy();
  });

  it('renders error-text with text', () => {
    const div = wrapper.find('#error-text').text();
    expect(div).not.toBeEmpty();
  })
});