import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    getAllCars: 'cars?sortBy=_createdOn%20desc',
    myListings: (userId) => `cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    cars: 'cars',
    getCarsByYear: (query) => `cars?where=year%3D${query}`
};

async function getAllCars() {
    return await api.get(BASE_URL + endpoints.getAllCars);
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.cars + `/${id}`);
}
async function createAListing(data) {
    return await api.post(BASE_URL + endpoints.cars, data);
}
async function listingDetails(id) {
    return await api.get(BASE_URL + endpoints.cars + `/${id}`);
}
async function updateListing(id, data) {
    return await api.put(BASE_URL + endpoints.cars + `/${id}`, data);
}
async function getMyListings(userId) {
    return await api.get(BASE_URL + endpoints.myListings(userId));
}
async function getCarsByYear(query) {
    return await api.get(BASE_URL + endpoints.getCarsByYear(query));
}

export const dataService = {
    deleteItem,
    getAllCars,
    createAListing,
    listingDetails,
    updateListing,
    getMyListings,
    getCarsByYear,
};