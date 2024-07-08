import { csrfFetch } from './csrf.js';

const LOAD = 'resousrce/LOAD';
const CREATE = 'resource/CREATE';
const DELETE = 'resource/DELETE';

const load = (list) => ({
    type: LOAD,
    list
});

const create = (data) => ({
    type: CREATE,
    data
});

const destroy = (resourceId) => ({
    type: DELETE,
    resourceId
});


export const getResources = () => async dispatch => {
    const response = await csrfFetch("/api/resources");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.Resources));
        return list
    }
};

export const addResource = (resource) => async dispatch => {
    const response = await csrfFetch(`/api/resources/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: resource.userId,
            name: resource.name,
            url: resource.url,
            keyWords: resource.keyWords,
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


const resourcesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allResources = {};
            action.list.forEach(resource => {
               allResources[resource.id] = resource;
            });
            return {...state, ...allResources};
        }
        case CREATE: {
            const newState = {...state};
            newState[action.data.id] = action.data;
            return newState;
        }
        default:
            return state;
    }
};

export default resourcesReducer
