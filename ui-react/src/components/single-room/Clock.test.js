import Clock from './Clock';

describe('Single Room Clock', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Clock />);
    const clock = wrapper.find('#single_room__clock');

    expect(clock).toBeTruthy();
  });

  it('has text in #single-room__time div', () => {
    const wrapper = mount(<Clock />);
    const time = wrapper.find('#single-room__time').text();

    expect(time).not.toEqual('');
  });

  it('has text in #single-room__date div', () => {
    const wrapper = mount(<Clock />);
    const time = wrapper.find('#single-room__date').text();

    expect(time).not.toEqual('');
  });

  it('calls componentWillUnmount on unmount', () => {
    const wrapper = shallow(<Clock />);
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    
    wrapper.unmount();

    expect(componentWillUnmount).toHaveBeenCalled();
  });

  it('calls tick function once', () => {
    const wrapper = shallow(<Clock />);

    let mockFn = jest.fn();
    Clock.prototype.tick = mockFn;

    const instance = wrapper.instance();
    const tick = jest.spyOn(instance, 'tick');
    
    instance.tick();
    expect(tick).toHaveBeenCalled();
  });
});
