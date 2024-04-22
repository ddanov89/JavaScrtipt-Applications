import { api } from "../util/requester.js";

const BASE_URL = "http://localhost:3030/data/";

const endpoints = {
    movies: "movies",
    totalLikes: (movieId) => `likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
    hasLiked: (movieId, userId) => `likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`,
    likes: 'likes',
};

async function getAllMovies() {
    return await api.get(BASE_URL + endpoints.movies);
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.movies + `/${id}`);
}
async function updateMovie(id, data) {
    return await api.put(BASE_URL + endpoints.movies + `/${id}`, data);
}
async function createAMovie(data) {
    return await api.post(BASE_URL + endpoints.movies, data);
}
async function getTotalLikes(movieId) {
    return await api.get(BASE_URL + endpoints.totalLikes(movieId));
}
async function hasLiked(movieId, userId) {
    let response = await api.get(BASE_URL + endpoints.hasLiked(movieId, userId));
    return response.length == 0 ? false : true; 
}
async function postALike(data) {
    return await api.post(BASE_URL + endpoints.likes, data);
}
async function revokeALike(id) {
    return await api.del(BASE_URL + endpoints.likes + `/${id}`);
}

export const dataService = {
    getAllMovies,
    createAMovie,
    updateMovie,
    deleteItem,
    getTotalLikes,
    hasLiked,
    postALike,
    revokeALike,
};