import { post } from "./api.axios";

export const signin = async (fields = {}) => {
	return await post(`login`, fields);
}