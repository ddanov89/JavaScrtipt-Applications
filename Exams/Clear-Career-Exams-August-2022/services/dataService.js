import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    getAllOffers: '/offers?sortBy=_createdOn%20desc',
    offers: '/offers',
    getAnOffer: '/applications',
    getTotalApplications: (offerId) => `/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    hasApplied: (offerId, userId) => `/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};
async function getAllOffers() {
    return await api.get(BASE_URL + endpoints.getAllOffers);
}
async function deleteOffer(id) {
    return await api.del(BASE_URL + endpoints.offers + `/${id}`);
}
async function createAnOffer(data) {
    return await api.post(BASE_URL + endpoints.offers, data);
}
async function offerDetails(id) {
    return await api.get(BASE_URL + endpoints.offers + `/${id}`)
}
async function updateOffer(id, data) {
    return await api.put(BASE_URL + endpoints.offers + `/${id}`, data);
}
async function addAnOffer(data) {
    return await api.post(BASE_URL + endpoints.offers, data);
}
async function getTotalApplications(offerId) {
    return await api.get(BASE_URL + endpoints.getTotalApplications(offerId));
}
async function hasApplied(offerId, userId) {
    return await api.get(BASE_URL + endpoints.hasApplied(offerId, userId));
}

export const dataService = {
    getAllOffers,
    deleteOffer,
    createAnOffer,
    offerDetails,
    updateOffer,
    addAnOffer,
    getTotalApplications,
    hasApplied
};