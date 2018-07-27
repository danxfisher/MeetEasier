import Clock from './Clock';

describe('Flightboard Clock', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Clock />);
    const clock = wrapper.find('#single_room__clock');

    expect(clock).toBeDefined();
  });
});
