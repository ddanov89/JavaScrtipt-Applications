import { userHelper } from "./userHelper.js";

async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    };
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = userHelper.getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }
    try {
        const response = await fetch(url, options);
        if (response.status == 204) {
            return null;
        }
        if (!response.ok) {
            if (response.status == 403) {
                userHelper.clearUserData();
            }
            const message = await response.json();
            throw new Error(message);
        }
        return response.json();
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