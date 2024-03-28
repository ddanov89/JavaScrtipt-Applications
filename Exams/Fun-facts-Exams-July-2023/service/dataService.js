import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    allFunFacts: '/facts?sortBy=_createdOn%20desc',
    fact: '/facts',
    likeAFact: '/likes',
    getTotalLikesById: (factId) => `/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    hasLiked: (factId, userId) => `/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function getAllFunFacts() {
    return await api.get(BASE_URL + endpoints.allFunFacts);
}

async function createAFunFact(data) {
    return await api.post(BASE_URL + endpoints.fact, data);
}

async function getFunFactDetails(id) {
    return await api.get(BASE_URL + endpoints.fact + `/${id}`);
}

async function updateAFact(data, id) {
    return await api.put(BASE_URL + endpoints.fact + `/${id}`, data);
}
async function deleteFact(id) {
    return await api.del(BASE_URL + endpoints.fact + `/${id}`);
}
async function likeAFact(data) {
    return await api.post(BASE_URL + endpoints.likeAFact, data);
}
async function getTotalLikesById(factId) {
    return await api.get(BASE_URL + endpoints.getTotalLikesById(factId));
}
async function hasLiked(factId, userId) {
    return await api.get(BASE_URL + endpoints.hasLiked(factId, userId));
}

export const dataService = {
    getAllFunFacts,
    createAFunFact,
    getFunFactDetails,
    updateAFact,
    deleteFact,
    likeAFact,
    getTotalLikesById,
    hasLiked
};