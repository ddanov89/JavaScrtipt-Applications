import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    solutions: 'solutions',
    getAllSolutions: 'solutions?sortBy=_createdOn%20desc',
    likes: 'likes',
    totalLikes: (solutionId) => `likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    hasLiked: (solutionId, userId) => `likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.solutions + `/${id}`);
}
async function getAllSolutions() {
    return await api.get(BASE_URL + endpoints.getAllSolutions);
}
async function solutionDetails(id) {
    return await api.get(BASE_URL + endpoints.solutions + `/${id}`);
}
async function updateASolution(id, data) {
    return await api.put(BASE_URL + endpoints.solutions + `/${id}`, data);
}
async function getALike(data) {
    return await api.post(BASE_URL + endpoints.likes, data);
}
async function getTotalLikes(solutionId) {
    return await api.get(BASE_URL + endpoints.totalLikes(solutionId));
}
async function hasLiked(solutionId, userId) {
    return await api.get(BASE_URL + endpoints.hasLiked(solutionId, userId));
}
async function createASolution(data) {
    return await api.post(BASE_URL + endpoints.solutions, data);
}

export const dataService = {
    deleteItem,
    getAllSolutions,
    solutionDetails,
    updateASolution,
    getALike,
    getTotalLikes,
    hasLiked,
    createASolution
};