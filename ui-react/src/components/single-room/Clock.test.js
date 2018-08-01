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
});
