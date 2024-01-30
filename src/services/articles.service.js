import { setParams } from "../helpers/params";
import { destroy, get, post, put } from "./api.axios";

export const getArticles = async (project_id, params = {}) => {
    let endpoint = `articles/${project_id}${setParams(params)}`;
    return await get(endpoint);
}

export const getArticle = async (id, params = {}) => {
    let endpoint = `articles/show/${id}${setParams(params, 'single')}`;
    return await get(endpoint);
}

export const saveArticle = async (fields) => {
    let endpoint = `articles`;
    return await post(endpoint, JSON.stringify(fields));
}

export const updateArticle = async (fields, id) => {
    let endpoint = `articles/${id}`;
    return await put(endpoint, JSON.stringify(fields));
}

export const duplicateArticle = async (duplicate) => {
    let endpoint = `articles/${duplicate.article_id}`;
    delete duplicate.article_id, duplicate.project_id;
    return await post(endpoint, JSON.stringify(duplicate));
}

export const sortArticle = async (items) => {
    let endpoint = `articles/sort`;
    return await post(endpoint, JSON.stringify({items: items}));
}

export const setCheckArticle = async (checks) => {
    let endpoint = `articles/check`;
    return await post(endpoint, JSON.stringify(checks));
}

export const deleteArticle = async (id) => {
    let endpoint = `articles/${id}`;
    return await destroy(endpoint);
}

export const donwloadArticle = async (article_id) => {
    let endpoint = `articles/print/article/${article_id}`;
    return await get(endpoint);
}

export const autosaveArticle = async (data) => {
    let endpoint = `articles/autosave`;
    return await post(endpoint, JSON.stringify(data));
}

export const autosaveUpdateArticle = async (id, data) => {
    let endpoint = `articles/autosave/${id}`;
    return await put(endpoint, JSON.stringify(data));
}

export const deleteAutosaveArticle = async (id) => {
    let endpoint = `articles/autosave/${id}`;
    return await destroy(endpoint);
}