import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import AssignmentResults from '../Results/AssignmentResults';
import api from '../services/assignmentResults';

jest.mock('../services/assignmentResults')
api.getAssignmentResults = jest.fn()
if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = () => {
        // Do nothing
    };
}

console.error = jest.fn();

afterEach(() => {
    cleanup;
})

describe('AssignmentResults Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<AssignmentResults selectedAssignment={'test assignment'} />);
    })

    it('should render', () => {
        const { getByText } = container
        getByText('Select Assignment')
    })

    it('should call getAssignmentResults when clicked on assignment', () => {
        expect(api.getAssignmentResults).toHaveBeenCalledTimes(1)
    })

})
