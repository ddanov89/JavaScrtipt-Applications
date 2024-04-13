import { api } from "../util/requester.js";

const BASE_URL = "http://localhost:3030/users/";

const endpoints = {
    logout: 'logout',
    login: 'login',
    register: 'register'
};

async function logout() {
    await api.get(BASE_URL + endpoints.logout);
}
async function login(data) {
    return await api.post(BASE_URL + endpoints.login, data);
}
async function register(data) {
    return await api.post(BASE_URL + endpoints.register, data);
}

export const authService = {
    logout,
    login,
    register
};