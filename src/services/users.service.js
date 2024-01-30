import { setParams } from "../helpers/params";
import { get, post } from "./api.axios";

export const getUser = async (params = {}) => {
	//let user_id = JSON.parse(localStorage.getItem('author_user')).id;
    let user_id = 3;
    let endpoint = `users/${user_id}${setParams(params, 'single')}`;
    return await get(endpoint);
}

export const getUsers = async (params = {}) => {
    let endpoint = `users${setParams(params)}`;
    return await get(endpoint);
}

const user = localStorage.getItem('author_user') ?? null;
export const userInfo = user !== null ? JSON.parse(user) : null;

export const setNewPassword = async (data) => {
	let user_id = JSON.parse(localStorage.getItem('author_user')).id;
    let endpoint = `users/password/${user_id}`;
    return await post(endpoint, data);
}