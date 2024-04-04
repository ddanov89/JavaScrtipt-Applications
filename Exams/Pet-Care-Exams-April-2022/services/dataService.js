import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    getAllPets: '/pets?sortBy=_createdOn%20desc&distinct=name',
    pets: '/pets',
    donation: '/donation',
    getAllDonations: (petId) => `/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    hasDonated: (petId, userId) => `/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function getAllPets() {
    return await api.get(BASE_URL + endpoints.getAllPets)
}
async function petDetails(id) {
    return await api.get(BASE_URL + endpoints.pets + `/${id}`);
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.pets + `/${id}`);
}

async function createAPost(data) {
    return await api.post(BASE_URL + endpoints.pets, data);
}
async function updatePet(id, data) {
    return await api.put(BASE_URL + endpoints.pets + `/${id}`, data);
}

async function makeADonation(data) {
    return await api.post(BASE_URL + endpoints.donation, data);
}
async function getAllDonations(petId) {
    return await api.get(BASE_URL + endpoints.getAllDonations(petId));
}
async function hasDonated(petId, userId) {
    return await api.get(BASE_URL + endpoints.hasDonated(petId, userId));
}

export const dataService = {
    deleteItem,
    getAllPets,
    createAPost,
    petDetails,
    updatePet,
    makeADonation,
    getAllDonations,
    hasDonated
};