import { setParams } from "../helpers/params";
import { destroy, get, post, put } from "./api.axios";

export const getChaptersByProject = async (project_id, params = {}) => {
    let endpoint = `chapters/${project_id}${setParams(params)}`;
    return await get(endpoint);
}

export const getChapter = async (id, params = {}) => {
    let endpoint = `chapters/show/${id}${setParams(params, 'single')}`;
    return await get(endpoint);
}

export const storeChapter = async (params = {}) => {
    let endpoint = `chapters`;
    return await post(endpoint, JSON.stringify(params));
}

export const updateChapter = async (fields, id) => {
    let endpoint = `chapters/${id}`;
    return await put(endpoint, JSON.stringify(fields));
}

export const sortChapter = async (items) => {
    let endpoint = `chapters/sort`;
    return await post(endpoint, JSON.stringify({items: items}));
}

export const deleteChapter = async (id) => {
    let endpoint = `chapters/${id}`;
    return await destroy(endpoint);
}

export const donwloadChapter = async (chapter_id) => {
    let endpoint = `articles/print/chapter/${chapter_id}`;
    return await get(endpoint);
}