import { csrfFetch } from './csrf.js';

const LOAD = 'question/LOAD';
const CREATE = 'question/CREATE';
const UPDATE = 'question/UPDATE';
const DELETE = 'question/DELETE';

const load = (list) => ({
    type: LOAD,
    list
});

const create = (data) => ({
    type: CREATE,
    data
});

const destroy = (questionId) => ({
    type: DELETE,
    questionId
});


export const getQuestions = () => async dispatch => {
    const response = await csrfFetch("/api/questions");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Questions));
        return list
    }
}


const questionsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allQuestions = {};
            action.list.forEach(question => {
               allQuestions[question.id] = question;
            });
            return {...state, ...allQuestions};
        }
        default:
            return state;
    }
};

export default questionsReducer
