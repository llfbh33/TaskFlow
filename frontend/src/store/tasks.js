import { csrfFetch } from './csrf.js';

const LOAD = 'task/LOAD';
const CREATE = 'task/CREATE';
const UPDATE = 'task/UPDATE';
const DELETE = 'task/DELETE';

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

const destroy = (taskId) => ({
    type: DELETE,
    taskId
});


export const getTasks = () => async dispatch => {
    const response = await csrfFetch("/api/tasks");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Tasks));
        return list
    }
}

export const completeTask = (taskId) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isComplete: true
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(update(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const inCompleteTask = (taskId) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isComplete: false
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(update(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

const tasksReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allTasks = {};
            action.list.forEach(task => {
               allTasks[task.id] = task;
            });
            return {...state, ...allTasks};
        }
        case UPDATE: {
            const newState = {...state};
            newState[action.data.id] = action.data;
            return newState
        }
        default:
            return state;
    }
};

export default tasksReducer
