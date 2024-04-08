import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    allMovies: 'theaters?sortBy=_createdOn%20desc&distinct=title',
    theaters: 'theaters',
    profile: (userId) => `theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    likeAMovie: 'likes',
    totalLikes: (theaterId) => `likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    hasLiked: (theaterId, userId) => `likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.theaters + `/${id}`);
}

async function getAllMovies() {
    return await api.get(BASE_URL + endpoints.allMovies);
}

async function createAMovie(data) {
    return await api.post(BASE_URL + endpoints.theaters, data);
}

async function movieDetails(id) {
    return await api.get(BASE_URL + endpoints.theaters + `/${id}`);
}

async function updateAMovie(id, data) {
    return await api.put(BASE_URL + endpoints.theaters + `/${id}`, data);
}

async function likeAMovie(data) {
    return await api.post(BASE_URL + endpoints.likeAMovie, data);
}
async function totalLikes(theaterId) {
    return await api.get(BASE_URL + endpoints.totalLikes(theaterId));
}
async function hasLiked(theaterId, userId) {
    return await api.get(BASE_URL + endpoints.hasLiked(theaterId, userId));
}
async function getUserProfile(userId) {
    return await api.get(BASE_URL + endpoints.profile(userId));
}
export const dataService = {
    deleteItem,
    getAllMovies,
    createAMovie,
    movieDetails,
    updateAMovie,
    hasLiked,
    getUserProfile,
    totalLikes,
    likeAMovie
};