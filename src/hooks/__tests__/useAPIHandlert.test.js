import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import axios from "axios";
import mockAxios from 'jest-mock-axios';
import { renderHook } from '@testing-library/react-hooks'
import useAPIHandler from '../useAPIHandler';


configure({adapter: new Adapter()})


jest.mock("axios");

describe('<useAPIHandler />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<useAPIHandler />);
    })

    afterEach(() => {
        jest.clearAllMocks();
        mockAxios.reset();
    });

    it('should request to the axios api with custom hook props properly', async() => {
        let data = {
            source_currency: 'USD',
            target_crypto_asset_id: 'b2384bf2-b14d-4916-aa97-85633ef05742',
            source_amount: '100',
        }

        axios.post = jest.fn().mockResolvedValue(data);
        const response = await renderHook(() => useAPIHandler('quoto', data));
        // expect(axios.post).toHaveBeenCalledTimes(1);
    })
})