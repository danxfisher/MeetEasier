import Clock from './Clock';

jest.useFakeTimers();

describe('Flightboard Clock', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Clock />);
    const clock = wrapper.find('#clock').exists();

    expect(clock).toBeTruthy();
  });

  it('has text in #clock div', () => {
    const wrapper = mount(<Clock />);
    const time = wrapper.find('#clock').text();

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
