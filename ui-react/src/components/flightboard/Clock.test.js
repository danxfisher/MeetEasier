import Clock from './Clock';

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

  it('componentWillUnmount should be called on unmount', () => {
    const wrapper = shallow(<Clock />);
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });

});
