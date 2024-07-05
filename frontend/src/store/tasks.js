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


const tasksReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allTasks = {};
            action.list.forEach(task => {
               alltasks[task.id] = task;
            });
            return {...state, ...allTasks};
        }
        default:
            return state;
    }
};

export default tasksReducer
