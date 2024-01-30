import axios from "axios";
const { VITE_API_URL, VITE_ERRORS_SHOW, VITE_API_TOKEN } = import.meta.env;

const clear = (response) => {
	if(VITE_ERRORS_SHOW !== 'on'){
		console.clear();
	} else {
		//console.log(response);
	}
};

const showURL = (url) => {
	if(VITE_ERRORS_SHOW === 'on'){
		//console.log(url);
	}
};

const getHeaders = () => {
	if(localStorage.getItem('author_user') !== null){
		return {
			'Content-Type': 'application/json',
			authorization: JSON.parse(localStorage.getItem('author_user')).token
		};
	}
	return {
		'Content-Type': 'application/json',
		authorization: VITE_API_TOKEN
	};
}

export const get = (endpoint) => {
	endpoint = `${VITE_API_URL}${endpoint}`;
	showURL(endpoint);
	return axios.get(endpoint, {headers: getHeaders()})
	.then(response => {
		return response.data;
	})
	.catch(function (error) {
		return error.response.data;
	})
	.finally(response => {
		clear(response);
	});
}

export const post = (endpoint, body) => {
	endpoint = `${VITE_API_URL}${endpoint}`;
	showURL(endpoint);
	return axios.post(endpoint, body, {headers: getHeaders()})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		return error.response.data;
	})
	.finally(response => {
		clear(response);
	});
}

export const put = (endpoint, body) => {
	endpoint = `${VITE_API_URL}${endpoint}`;
	showURL(endpoint);
	return axios.put(endpoint, body, {headers: getHeaders()})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		console.log(error);
	})
	.finally(response => {
		clear(response);
	});
}

export const destroy = (endpoint) => {
	endpoint = `${VITE_API_URL}${endpoint}`;
	showURL(endpoint);
	return axios.delete(endpoint, {headers: getHeaders()})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		console.log(error);
	})
	.finally(response => {
		clear(response);
	});
}