import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Questions from '../Questions/Questions';
import QuestionPopup from '../Questions/QuestionPopup';
import api from '../services/questions';

jest.mock('../services/questions');

api.getQuestions = jest.fn().mockResolvedValue({
    data: [
        {
            options: [
                "Availability",
                "Reliability",
                "Usability",
                "All of the mentioned"
            ],
            _id: "6033a7768d9e9fffb916c03a",
            question: "What are the types of requirements?",
            category: "Requirement Engineering",
            difficulty: "Easy",
            answer: "All of the mentioned"
        }
    ]
})

api.addQuestion = jest.fn()
api.updateQuestion = jest.fn()

console.error = jest.fn();

afterEach(cleanup)


describe('Questions Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<Questions />)
    })

    it('should render and call getQuuestions', () => {
        const { getByText } = container
        getByText('Question Bank')
        expect(api.getQuestions).toHaveBeenCalledTimes(1)
    })

    it('add question', () => {
        let popup = null
        popup = render(<QuestionPopup type={'add'} />)
        const { getByLabelText, getByText } = popup
        fireEvent.change(getByLabelText('Question'), { target: { value: 'test question' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.addQuestion).toHaveBeenCalledTimes(1)
    })

    it('no call add question when click cancel', () => {
        let mockFn = jest.fn();
        let popup = null
        popup = render(<QuestionPopup type={'add'} parentCallback={mockFn} />)
        const { getByText } = popup
        fireEvent.click(getByText('Cancel'))
        expect(api.addQuestion).toHaveBeenCalledTimes(0)
    })

    it('edit question', () => {
        let popup = null
        popup = render(<QuestionPopup type={'edit'} />)
        const { getByText, getByLabelText } = popup
        fireEvent.change(getByLabelText('Question'), { target: { value: 'test question 2' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.updateQuestion).toHaveBeenCalledTimes(1)
    })

})
