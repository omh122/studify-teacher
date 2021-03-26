import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Login from '../Authentication/Login';
import api from '../services/teachers';

jest.mock('../services/teachers')
api.login = jest.fn()
console.error = jest.fn();

afterEach(cleanup)

describe('Login Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<Login />)
    })

    it('should render', () => {
        const { getByLabelText, getByText } = container
        getByLabelText('Username')
        getByLabelText('Password')
        getByText('Login')
    })

    it('should not call api login method when username and pw are empty', () => {
        const { getByText } = container
        fireEvent.click(getByText('Login'))
        expect(api.login).toHaveBeenCalledTimes(0)
    })

    it('should call api login method when username and pw are filled', () => {
        const { getByLabelText, getByText } = container

        fireEvent.change(getByLabelText('Username'), { target: { value: 'teacher1' } })
        fireEvent.change(getByLabelText('Password'), { target: { value: 'teacher1' } })

        fireEvent.click(getByText('Login'))
        expect(api.login).toHaveBeenCalledTimes(1)
    })
})
