import React from 'react';
import Login from '..';
import {render} from 'react-testing-library';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

describe('login renders correctly', () => {
    const wrapper = render(<Login/>);
    expect(wrapper).toMatchSnapshoot();
});
