import Spinner from './Spinner';

describe('Spinner component', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders fb__spinner-wrap', () => {
    const div = wrapper.find('#fb__spinner-wrap').exists();
    expect(div).toBeTruthy();
  });

  it('renders fb__spinner-wrap with img', () => {
    const div = wrapper.find('#fb__spinner-wrap').html();
    expect(div).not.toBeEmpty();
  })
});