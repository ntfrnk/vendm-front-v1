import { setParams } from "../helpers/params";
import { destroy, get, post, put } from "./api.axios";

export const getProjects = async (params = {}) => {
    //let user_id = JSON.parse(localStorage.getItem('author_user')).id;
    let user_id = 3;
    let endpoint = `projects/${user_id}${setParams(params)}`;
    return await get(endpoint);
}

export const getSharedProjects = async (params = {}) => {
    let user_id = JSON.parse(localStorage.getItem('author_user')).id;
    let endpoint = `projects/${user_id}${setParams(params)}`;
    return await get(endpoint);
}

export const getProject = async (id, params = {}) => {
    let endpoint = `projects/show/${id}${setParams(params, 'single')}`;
    return await get(endpoint);
}

export const saveProject = async (fields) => {
    let endpoint = `projects`;
    return await post(endpoint, JSON.stringify(fields));
}

export const updateProject = async (fields, id) => {
    let endpoint = `projects/${id}`;
    return await put(endpoint, JSON.stringify(fields));
}

export const deleteProject = async (id) => {
    let endpoint = `projects/${id}`;
    return await destroy(endpoint);
}

export const saveCollaborator = async (fields) => {
    let endpoint = `projects/collaborator`;
    return await post(endpoint, JSON.stringify(fields));
}

export const deleteCollaborator = async (id) => {
    let endpoint = `projects/collaborator/${id}`;
    return await destroy(endpoint);
}