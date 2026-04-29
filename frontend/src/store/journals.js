import { csrfFetch } from './csrf.js';

const LOAD = 'journal/LOAD';
const CREATE = 'journal/CREATE';
const UPDATE = 'journal/UPDATE';
const DESTROY = 'journal/DESTROY';
const CLEAR = 'journal/CLEAR';

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
    type: DESTROY,
    journalId
});

export const clearJournals = () => ({
    type: CLEAR
})


export const getJournals = () => async dispatch => {
    const response = await csrfFetch("/api/journals");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Journals));
        return list;
    } else {
        const errors = await response.json();
        return errors;
    }
};


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
        dispatch(create(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const updateJournal = (journalId, entry) => async dispatch => {
    const response = await csrfFetch(`/api/journals/${journalId}`, {
        method: "PUT", // or PATCH depending on backend
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
        dispatch(update(data)); 
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const deleteJournal = (journalId) => async dispatch => {
    const response = await csrfFetch(`/api/journals/${journalId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(journalId));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

const initialState = {}

const journalsReducer = (state = initialState, action) => {
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
            return newState;
        }
        case UPDATE: {
            const newState = {...state};
            newState[action.data.id] = action.data;
            return newState;
        }
        case DESTROY: {
            const newState = {...state};
            delete newState[action.journalId];
            return newState;
        }
        case CLEAR: {
            return initialState;
        }
        default:
            return state;
    }
};

export default journalsReducer
