import { csrfFetch } from './csrf.js';

const LOAD = 'journal/LOAD';
const CREATE = 'journal/CREATE';
const UPDATE = 'journal/UPDATE';
const DELETE = 'journal/DELETE';

const load = (list) => ({
    type: LOAD,
    list
});

const create = (data) => ({
    type: CREATE,
    data
});

const destroy = (journalId) => ({
    type: DELETE,
    journalId
});


export const getJournals = () => async dispatch => {
    const response = await csrfFetch("/api/journals");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Journals));
        return list
    }
}


const journalsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allJournals = {};
            action.list.forEach(journal => {
               allJournals[journal.id] = journal;
            });
            return {...state, ...allJournals};
        }
        default:
            return state;
    }
};

export default journalsReducer
