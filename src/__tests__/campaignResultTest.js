import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CampaignResults from '../Results/CampaignResults';
import api from '../services/campaignResults';

jest.mock('../services/campaignResults')
api.getCampaignResults = jest.fn()
if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = () => {
        // Do nothing
    };
}

console.error = jest.fn();

afterEach(() => {
    cleanup;
})

describe('CampaignResults Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<CampaignResults />);
    })

    it('should render and call getCampaignResults', () => {
        expect(api.getCampaignResults).toHaveBeenCalledTimes(1)
    })
})
