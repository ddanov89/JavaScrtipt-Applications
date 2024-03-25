import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    allAlbums: 'albums?sortBy=_createdOn%20desc',
    albums: 'albums',
    likes: 'likes',
    getLikesByAlbumId: (albumId) => `likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    hasLiked: (albumId, userId) => `likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function getAllAlbums() {
    return await api.get(BASE_URL + endpoints.allAlbums);
}

async function createAnAlbum(data) {
    return await api.post(BASE_URL + endpoints.albums, data);
}

async function getAlbumDetails(id) {
    return await api.get(BASE_URL + endpoints.albums + `/${id}`);
}

async function updateAnAlbum(id, data) {
    return await api.put(BASE_URL + endpoints.albums + `/${id}`, data);
}

async function deleteAlbum(id) {
    return await api.del(BASE_URL + endpoints.albums + `/${id}`);
}

async function likeAnALbum(data) {
    return await api.post(BASE_URL + endpoints.likes, data);
}

async function getTotalLikes(albumId) {
    return await api.get(BASE_URL + endpoints.getLikesByAlbumId(albumId));
}

async function hasLiked(albumId, userId) {
    return await api.get(BASE_URL + endpoints.hasLiked(albumId, userId));
}

export const dataService = {
    getAllAlbums,
    createAnAlbum,
    getAlbumDetails,
    updateAnAlbum,
    deleteAlbum,
    likeAnALbum,
    getTotalLikes,
    hasLiked
};
