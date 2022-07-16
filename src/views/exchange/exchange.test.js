import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Exchange from './exchange';

configure({adapter: new Adapter()})

describe('<Exchange />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<Exchange />);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Sould render with two <FormControl />', () => {
        expect(wrapper.find(FormControl)).toHaveLength(2);
    })

    it('Should have default value of 100 for prepaid', () => {
        const formControlItem = wrapper.find(FormControl).first();
        const input = formControlItem.find(OutlinedInput);
        expect(input.prop('value')).toBe('100')
    })

    it('Should not setValues when we do not change the input value', () => {
        const setStateMock = jest.fn();
        const useStateMock = (useState) => [useState, setStateMock]
        jest.spyOn(React, 'useState').mockImplementation(useStateMock)
        const formControlItem = wrapper.find(FormControl).first();
        const input = formControlItem.find(OutlinedInput);
        input.simulate('change', {target: { value: '100' } });
        wrapper.update()
        expect(setStateMock).toHaveBeenCalledTimes(0);
    })
})