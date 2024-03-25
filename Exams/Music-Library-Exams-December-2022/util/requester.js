import { userHelper } from "./userHelper.js";

async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const userData = userHelper.getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
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
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}

async function get(url) {
    return requester("GET", url);
}

async function post(url, data) {
    return requester('POST', url, data);
}

async function put(url, data) {
    return requester("PUT", url, data);
}

async function del(url) {
    return requester("DELETE", url);
}

export const api = {
    get, post, put, del
};