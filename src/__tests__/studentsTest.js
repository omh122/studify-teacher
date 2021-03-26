import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Students from '../Students/Students';
import StudentPopup from '../Students/StudentPopup';
import api from '../services/students';
import ConfirmationDialog from '../Components/ConfirmationDialog';

jest.mock('../services/students');

api.getStudents = jest.fn()
api.addStudent = jest.fn()
api.updateStudent = jest.fn()
api.deleteStudent = jest.fn()

console.error = jest.fn();

afterEach(cleanup)


describe('Students Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<Students />)
    })

    it('should render and call getStudents', () => {
        const { getByText } = container
        getByText('Students')
        expect(api.getStudents).toHaveBeenCalledTimes(1)
    })

    it('add student', () => {
        let popup = null
        popup = render(<StudentPopup type={'add'} />)
        const { getByLabelText, getByText } = popup
        // fireEvent.change(getByLabelText('Student Name'), { target: { value: 'student1' } })

        fireEvent.click(getByText('Confirm'))
        expect(api.addStudent).toHaveBeenCalledTimes(1)
    })

    it('no call add student when click cancel', () => {
        let mockFn = jest.fn();
        let popup = null
        popup = render(<StudentPopup type={'add'} parentCallback={mockFn} />)
        const { getByText } = popup
        fireEvent.click(getByText('Cancel'))
        expect(api.addStudent).toHaveBeenCalledTimes(0)
    })

    it('edit student', () => {
        let popup = null
        popup = render(<StudentPopup type={'edit'} />)
        const { getByLabelText, getByText } = popup
        // fireEvent.change(getByLabelText('Student Name'), { target: { value: 'student2' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.updateStudent).toHaveBeenCalledTimes(1)
    })

    it('delete student', () => {
        let popup = null
        popup = render(<ConfirmationDialog parentCallback={api.deleteStudent} />)
        const { getByText } = popup
        fireEvent.click(getByText('Confirm'))
        expect(api.deleteStudent).toHaveBeenCalledTimes(1)
    })

})
