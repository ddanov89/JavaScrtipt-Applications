import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    getAllMemes: 'memes?sortBy=_createdOn%20desc',
    memes: 'memes',
    getUserProfile: (userId) => `memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.memes + `/${id}`);
}

async function getAllMemes() {
    return await api.get(BASE_URL + endpoints.getAllMemes);
}
async function updateMeme(id, data) {
    return await api.put(BASE_URL + endpoints.memes + `/${id}`, data);
}

async function memeDetails(id) {
    return await api.get(BASE_URL + endpoints.memes + `/${id}`);
}

async function createAMeme(data) {
    return await api.post(BASE_URL + endpoints.memes, data);
}
async function getUserProfile(userId) {
    return await api.get(BASE_URL + endpoints.getUserProfile(userId));
}

export const dataService = {
    getAllMemes,
    createAMeme,
    deleteItem,
    createAMeme,
    updateMeme,
    memeDetails,
    getUserProfile
};