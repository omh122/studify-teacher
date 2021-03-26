import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Resources from '../Resources/Resources';
import ResourcePopup from '../Resources/ResourcePopup';
import api from '../services/resources';
import ConfirmationDialog from '../Components/ConfirmationDialog';

jest.mock('../services/resources');

api.getResources = jest.fn().mockResolvedValue({
    data: [
        {
            _id: "6033cc79c1df18b79b4a5fc4",
            name: "Introduction to Requirement Engineering",
            category: "Introduction",
            url: "https://youtu.be/Gm9SJcbf6O0"
        }
    ]
})

api.addResource = jest.fn()
api.updateResource = jest.fn()
api.deleteResource = jest.fn()

console.error = jest.fn();

afterEach(cleanup)

describe('Resources Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<Resources />)
    })

    it('should render and call getResources', () => {
        const { getByText } = container
        getByText('Teaching Resources')
        expect(api.getResources).toHaveBeenCalledTimes(1)
    })

    it('add resource', () => {
        let popup = null
        popup = render(<ResourcePopup type={'add'} />)
        const { getByLabelText, getByText } = popup
        fireEvent.change(getByLabelText('Name'), { target: { value: 'resource1' } })

        fireEvent.click(getByText('Confirm'))
        expect(api.addResource).toHaveBeenCalledTimes(1)
    })

    it('no call add resource when click cancel', () => {
        let mockFn = jest.fn();
        let popup = null
        popup = render(<ResourcePopup type={'add'} parentCallback={mockFn} />)
        const { getByText } = popup
        fireEvent.click(getByText('Cancel'))
        expect(api.addResource).toHaveBeenCalledTimes(0)
    })

    it('edit resource', () => {
        let popup = null
        popup = render(<ResourcePopup type={'edit'} />)
        const { getByLabelText, getByText } = popup
        fireEvent.change(getByLabelText('Name'), { target: { value: 'resource2' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.updateResource).toHaveBeenCalledTimes(1)
    })

    it('delete resource', () => {
        let popup = null
        popup = render(<ConfirmationDialog parentCallback={api.deleteResource} />)
        const { getByText } = popup
        fireEvent.click(getByText('Confirm'))
        expect(api.deleteResource).toHaveBeenCalledTimes(1)
    })

})
