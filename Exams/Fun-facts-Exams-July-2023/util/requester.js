import { userHelper } from "./userHelper.js";

async function requester(method, url, data) {
    const option = {
        method,
        headers: {}
    };

    const userData = userHelper.getUserData();
    if (userData?.accessToken) {
        option.headers["X-Authorization"] = userData.accessToken;
    }

    if (data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, option);

        if (response.status == 204) {
            return null; 
        }

        if (!response.ok) {
            if (response.status === 403) {
                userHelper.clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();

    } catch (error) {
        alert(error.message);
    }
}

async function get(url) {
    return await requester("GET", url);
}

async function post(url, data) {
    return await requester("POST", url, data);
}

async function put(url, data) {
    return await requester("PUT", url, data);
}

async function del(url) {
    return await requester("DELETE", url);
}

export const api = {
    get, post, put, del
};