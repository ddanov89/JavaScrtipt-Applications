import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    allCars: 'cars?sortBy=_createdOn%20desc',
    car: 'cars',
    byName: (query) => `cars?where=model%20LIKE%20%22${query}%22`
};

async function getAllCars() {
    return await api.get(BASE_URL + endpoints.allCars);
}

async function createCar(data) {
    return await api.post(BASE_URL + endpoints.car, data);
}

async function getCarDetails(id) {
    return await api.get(BASE_URL + endpoints.car + `/${id}`);
}
async function updateCar(id, data) {
    return await api.put(BASE_URL + endpoints.car + `/${id}`, data);
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.car + `/${id}`);
}
export async function getCarsByName(query) {
    return await api.get(BASE_URL + endpoints.byName(query));
}

export const dataService = {
    getAllCars,
    createCar,
    getCarDetails,
    updateCar,
    deleteItem,
    getCarsByName
};