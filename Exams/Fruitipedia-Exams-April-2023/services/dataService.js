import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    allFruits: '/fruits?sortBy=_createdOn%20desc',
    fruits: '/fruits',
    searchFruits: (query) => `/fruits?where=name%20LIKE%20%22${query}%22`
}

async function getAllFruits() {
    return await api.get(BASE_URL + endpoints.allFruits);
}

async function createFruit(data) {
    return await api.post(BASE_URL + endpoints.fruits, data);
}

async function fruitDetails(id) {
    return await api.get(BASE_URL + endpoints.fruits + `/${id}`);
}

async function updateFruit(id, data){
    return await api.put(BASE_URL + endpoints.fruits + `/${id}`, data);
}
async function deleteFruit(id) {
    return await api.del(BASE_URL + endpoints.fruits + `/${id}`);
}

async function getFruitsByName(query) {
    return await api.get(BASE_URL + endpoints.searchFruits(query));
}

export const dataService = {
    getAllFruits,
    createFruit,
    fruitDetails,
    updateFruit,
    deleteFruit,
    getFruitsByName
};