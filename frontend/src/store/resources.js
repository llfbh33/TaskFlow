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
}


const resourcesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allResources = {};
            action.list.forEach(resource => {
               allResources[resource.id] = resource;
            });
            return {...state, ...allResources};
        }
        default:
            return state;
    }
};

export default resourcesReducer
