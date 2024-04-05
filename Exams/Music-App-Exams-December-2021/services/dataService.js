import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    getAllAlbums: '/albums?sortBy=_createdOn%20desc&distinct=name',
    albums: '/albums',
    getAlbumsByName: (query) => `/albums?where=name%20LIKE%20%22${query}%22`
};

async function getAllAlbums() {
    return await api.get(BASE_URL + endpoints.getAllAlbums);
}

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.albums + `/${id}`);
}

async function createAnAlbum(data) {
    return await api.post(BASE_URL + endpoints.albums, data);
}
async function albumDetails(id) {
    return await api.get(BASE_URL + endpoints.albums + `/${id}`);
}
async function updateAnAlbum(id, data) {
    return await api.put(BASE_URL + endpoints.albums + `/${id}`, data);
}
async function getAlbumsByName(query) {
    return await api.get(BASE_URL + endpoints.getAlbumsByName(query));
}

export const dataService = {
    getAllAlbums,
    deleteItem,
    createAnAlbum,
    albumDetails,
    updateAnAlbum,
    getAlbumsByName,
};