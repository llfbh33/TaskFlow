import { csrfFetch } from './csrf.js';

const LOAD = 'question/LOAD';
const CREATE = 'question/CREATE';
// const UPDATE = 'question/UPDATE';
const DELETE_QUESTION = 'question/DELETE';
const CLEAR_QUESTIONS = 'question/CLEAR_QUESTIONS';

const load = (list) => ({
    type: LOAD,
    list
});

const create = (data) => ({
    type: CREATE,
    data
});

// const update = (data) => ({
//     type: UPDATE,
//     data
// })

const destroyQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    questionId
});

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS,
});


export const getQuestions = () => async dispatch => {
    const response = await csrfFetch("/api/questions");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Questions));
        return list
    }
};

export const createQuestion = (question) => async dispatch => {
    const response = await csrfFetch(`api/questions/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: question.userId,
            question: question.question
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateQuestion = (question) => async dispatch => {
    const response = await csrfFetch(`/api/questions/${question.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: question.answer,
            keyWords: question.keyWords,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteQuestions = (questionId) => async dispatch => {
    const response = await csrfFetch(`/api/questions/${questionId}/delete`, {
        method: 'DELETE',
    });
    if (response.ok) {
        return dispatch(destroyQuestion(questionId));
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {}

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allQuestions = {};
            action.list.forEach(question => {
               allQuestions[question.id] = question;
            });
            return {...state, ...allQuestions};
        }
        case CREATE: {
            const newState = {...state};
            newState[action.data.id] = action.data;
            return newState;
        }
        case DELETE_QUESTION: {
            const newState = {...state};
            delete newState[action.questionId]
            return newState;
        }
        case CLEAR_QUESTIONS: {
            return initialState
        }
        default:
            return state;
    }
};

export default questionsReducer
