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
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (response.status == 204) {
            return null;
        }

        if (!response.ok) {
            if (response.status == 403) {
                userHelper.clearUSerData();
            }
            let message = await response.json();
            throw new Error(message);
        }

        return await response.json();

    } catch (error) {
        const message = error.message;
        alert(message);
    }
}

async function get(url) {
    return await requester("GET", url);
}
async function post(url, data) {
    return await requester('POST', url, data);
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