import { api } from "../util/requester.js";

const BASE_URL = "http://localhost:3030/data/";

const endpoints = {
    getAllMotorcycles: 'motorcycles?sortBy=_createdOn%20desc',
    motorcycles: "motorcycles",
    getItemByName: (query) => `motorcycles?where=model%20LIKE%20%22${query}%22`
};

async function getAllMotorcycles() {
    return await api.get(BASE_URL + endpoints.getAllMotorcycles);
}

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.motorcycles + `/${id}`);
}

async function createAnItem(data) {
    return await api.post(BASE_URL + endpoints.motorcycles, data);
}

async function itemDetails(id) {
    return await api.get(BASE_URL + endpoints.motorcycles + `/${id}`);
}

async function updateAnItem(id, data) {
    return await api.put(BASE_URL + endpoints.motorcycles + `/${id}`, data);
}

async function getItemByName(query) {
    return await api.get(BASE_URL + endpoints.getItemByName(query));
}

export const dataService = {
    deleteItem,
    getAllMotorcycles,
    createAnItem,
    itemDetails,
    updateAnItem,
    getItemByName
};