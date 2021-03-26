import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Assignments from '../Assignments/Assignments';
import AssignmentPopup from '../Assignments/AssignmentPopup';
import api from '../services/assignments';
import ConfirmationDialog from '../Components/ConfirmationDialog';
import SocialMedia from '../Assignments/SocialMedia';

const assignment = {
    _id: "604644bdd88d05a2e71ab55b",
    questionIds: [
        "6033a7a78d9e9fffb916c03b",
        "6033a7768d9e9fffb916c03a",
        "6033a7dd8d9e9fffb916c03c",
        "6033b9aa02e8cc4b084d2f2a",
        "6033b9aa02e8cc4b084d2f2a"
    ],
    name: "test3",
    assignmentType: "challenge",
    __v: 0,
    questions: [
        {
            options: [
                "SDD",
                "SRS",
                "DDD",
                "SRD"
            ],
            _id: "6033a7dd8d9e9fffb916c03c",
            question: "The user system requirements are the parts of which document ?",
            category: "Requirement Engineering",
            difficulty: "Easy",
            answer: "SRS"
        },
        {
            options: [
                "Entry level personnel",
                "Middle level stakeholder",
                "Managers",
                "Users of the software"
            ],
            _id: "6033b9aa02e8cc4b084d2f2a",
            question: "Which is one of the most important stakeholder from the following?",
            category: "Requirement Engineering",
            difficulty: "Medium",
            answer: "Users of the software",
            __v: 0
        },
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
        },
        {
            options: [
                "Portability",
                "Maintainability",
                "Availability",
                "Both Portability and Maintainability"
            ],
            _id: "6033a7a78d9e9fffb916c03b",
            question: "Select the developer-specific requirement?",
            category: "Requirement Engineering",
            difficulty: "Medium",
            answer: "Both Portability and Maintainability"
        },
        {
            options: [
                "Entry level personnel",
                "Middle level stakeholder",
                "Managers",
                "Users of the software"
            ],
            _id: "6033b9aa02e8cc4b084d2f2a",
            question: "Which is one of the most important stakeholder from the following?",
            category: "Requirement Engineering",
            difficulty: "Medium",
            answer: "Users of the software",
            __v: 0
        }
    ]
}

const questionBank = [
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
    },
    {
        options: [
            "Portability",
            "Maintainability",
            "Availability",
            "Both Portability and Maintainability"
        ],
        _id: "6033a7a78d9e9fffb916c03b",
        question: "Select the developer-specific requirement?",
        category: "Requirement Engineering",
        difficulty: "Medium",
        answer: "Both Portability and Maintainability"
    },
    {
        options: [
            "SDD",
            "SRS",
            "DDD",
            "SRD"
        ],
        _id: "6033a7dd8d9e9fffb916c03c",
        question: "The user system requirements are the parts of which document ?",
        category: "Requirement Engineering",
        difficulty: "Easy",
        answer: "SRS"
    },
    {
        options: [
            "Entry level personnel",
            "Middle level stakeholder",
            "Managers",
            "Users of the software"
        ],
        _id: "6033b9aa02e8cc4b084d2f2a",
        question: "Which is one of the most important stakeholder from the following?",
        category: "Requirement Engineering",
        difficulty: "Medium",
        answer: "Users of the software",
        __v: 0
    },
    {
        options: [
            "1",
            "2",
            "3.0",
            "4"
        ],
        _id: "60372bfb0f616c5240eadda4",
        question: "Sample question",
        category: "Introduction",
        difficulty: "Medium",
        answer: "1",
        __v: 1
    },
    {
        options: [
            "123",
            "234",
            "345",
            "456"
        ],
        _id: "60372c120f616c5240eadda5",
        question: "Sample Question 2",
        category: "Analysis",
        difficulty: "Medium",
        answer: "234",
        __v: 0
    },
    {
        options: [
            "t",
            "e",
            "s",
            "t"
        ],
        _id: "604b19e7ea85aa04eb5795d3",
        question: "testingqns?",
        category: "Requirement Engineering",
        difficulty: "Easy",
        answer: "e"
    },
    {
        options: [
            "CZ3003",
            "SSAD",
            "CZ3001",
            "CZ3004"
        ],
        _id: "604ef2e9e56e7e28ccc35165",
        question: "What is the name of this course?",
        category: "Introduction",
        difficulty: "Easy",
        answer: "SSAD",
        __v: 0
    }
]

jest.mock('../services/assignments');

api.getAssignments = jest.fn()
api.addAssignment = jest.fn()
api.updateAssignment = jest.fn()
api.deleteAssignment = jest.fn()

console.error = jest.fn();

afterEach(cleanup)

describe('Assignments Testing', () => {
    let container = null
    beforeEach(() => {
        container = render(<Assignments />)
    })

    it('should render and call getAssignments', () => {
        const { getByText } = container
        getByText('Assignments')
        expect(api.getAssignments).toHaveBeenCalledTimes(1)
    })

    it('add assignment', () => {
        let popup = null
        popup = render(<AssignmentPopup type={'add'} questionbank={questionBank} assignment={assignment} />)
        const { getByLabelText, getByText } = popup
        fireEvent.change(getByLabelText('Assignment Name'), { target: { value: 'test assignment' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.addAssignment).toHaveBeenCalledTimes(1)
    })

    it('add assignment fails when less than 5 qns selected', () => {
        let popup = null
        popup = render(<AssignmentPopup type={'add'} questionbank={questionBank} />)
        const { getByLabelText, getByText } = popup
        fireEvent.change(getByLabelText('Assignment Name'), { target: { value: 'test assignment' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.addAssignment).toHaveBeenCalledTimes(0)
    })

    it('no call add assignment when click cancel', () => {
        let mockFn = jest.fn();
        let popup = null
        popup = render(<AssignmentPopup type={'add'} parentCallback={mockFn} questionbank={questionBank} />)
        const { getByText } = popup
        fireEvent.click(getByText('Cancel'))
        expect(api.addAssignment).toHaveBeenCalledTimes(0)
    })

    it('edit assignment', () => {
        let popup = null
        popup = render(<AssignmentPopup type={'edit'} questionbank={questionBank} assignment={assignment} />)
        const { getByText, getByLabelText } = popup
        fireEvent.change(getByLabelText('Assignment Name'), { target: { value: 'test assignment 2' } })
        fireEvent.click(getByText('Confirm'))
        expect(api.updateAssignment).toHaveBeenCalledTimes(1)
    })

    it('delete assignment', () => {
        let popup = null
        popup = render(<ConfirmationDialog parentCallback={api.deleteAssignment} />)
        const { getByText } = popup
        fireEvent.click(getByText('Confirm'))
        expect(api.deleteAssignment).toHaveBeenCalledTimes(1)
    })

    it('share assignment', () => {
        let popover = null
        popover = render(<SocialMedia assignment={assignment} />)
        const { getByTestId } = popover
        expect(getByTestId('fb-button')).toBeInTheDocument()
        expect(getByTestId('twt-button')).toBeInTheDocument()
        expect(getByTestId('email-button')).toBeInTheDocument()
    })

})
