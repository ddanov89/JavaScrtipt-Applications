import { api } from "../util/requester.js";

const BASE_URL = "http://localhost:3030/";

const endpoints = {
    login: 'users/login',
    logout: 'users/logout',
    register: 'users/register'
};

async function login(data) {
    return await api.post(BASE_URL + endpoints.login, data);
}
async function logout() {
    return await api.get(BASE_URL + endpoints.logout);
}
async function register(data) {
    return await api.post(BASE_URL + endpoints.register, data);
}

export const authService = {
    login,
    logout,
    register
};