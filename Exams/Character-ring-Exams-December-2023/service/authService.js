import { api } from "../util/requester.js";
import { userHelper } from "../util/userHelper.js";

const BASE_URL = 'http://localhost:3030/';

const endpoints = {
    login: 'users/login',
    register: "users/register",
    logout: 'users/logout'
};

async function login(data) {
    return await api.post(BASE_URL + endpoints.login, data);
}
async function register(data) {
    return await api.post(BASE_URL + endpoints.register, data);
}
async function logout() {
    await api.get(BASE_URL + endpoints.logout);
    userHelper.clearUSerData();
}

export const authService = {
    login,
    register,
    logout
};