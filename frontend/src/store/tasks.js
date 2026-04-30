import { csrfFetch } from './csrf.js';

const LOAD = 'task/LOAD';
const CREATE = 'task/CREATE';
const UPDATE = 'task/UPDATE';
const DELETE = 'task/DELETE';
const CLEAR_TASKS = 'task/CLEAR_TASKS'

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

const deleteTask = (taskId) => ({
    type: DELETE,
    taskId
});

export const clearTasks = () => ({
    type: CLEAR_TASKS,
});



export const getTasks = () => async dispatch => {
    const response = await csrfFetch("/api/tasks");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Tasks));
        return list
    }
}


export const createTask = (task) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: task.userId,
            task: task.task,
            isComplete: 'false',
            date: task.date
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


export const updateTask = (task) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date: task.date,
            task: task.task,
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
}


export const completeTask = (task, complete) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isComplete: complete,
            date: task.date
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

export const deleteTasks = (taskId) => async dispatch => {
    const response = await csrfFetch(`/api/tasks/${taskId}/delete`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return dispatch(deleteTask(taskId))
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {}

const tasksReducer = (state = initialState, action) => {
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
        case CLEAR_TASKS: {
            return initialState;
        }
        case DELETE: {
            const newState = {...state};
            delete newState[action.taskId];
            return newState;
        }
        default:
            return state;
    }
};

export default tasksReducer
