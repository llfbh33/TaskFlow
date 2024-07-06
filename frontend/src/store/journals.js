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

const update = (data) => ({
    type: UPDATE,
    data
})

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

export const createJournal = (entry) => async dispatch => {
    const response = await csrfFetch("/api/journals/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: entry.userId,
            projects: entry.projects,
            today: entry.today,
            challenges: entry.challenges,
            overcome: entry.overcome,
            accomplish: entry.accomplish,
            goals: entry.goals
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return dispatch(createJournal(data));
    } else {
        const errors = await response.json();
        return errors;
    }

};


const journalsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {};
            action.list.forEach(journal => {
               newState[journal.id] = journal;
            });
            return {...state, ...newState};
        }
        case CREATE: {
            const newState = {...state};
            newState[action.data.id] = action.data;
            return newState
        }
        default:
            return state;
    }
};

export default journalsReducer
