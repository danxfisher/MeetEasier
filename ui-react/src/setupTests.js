import React from 'react';
import 'jest-extended';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

// produce human readable output of snapshots
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// globals
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
