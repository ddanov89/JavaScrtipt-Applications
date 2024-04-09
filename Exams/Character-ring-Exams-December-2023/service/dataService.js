import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    allCharacters: 'characters?sortBy=_createdOn%20desc',
    character: 'characters',
};

async function getAllCharacters() {
    return await api.get(BASE_URL + endpoints.allCharacters);
}

async function createCharacter(data) {
    return await api.post(BASE_URL + endpoints.character, data);
}

async function getCharacterDetails(id) {
    return await api.get(BASE_URL + endpoints.character + `/${id}`);
}

async function updateCharacter(data, id) {
    return await api.put(BASE_URL + endpoints.character + `/${id}`, data);
}
async function deleteCharacter(id) {
    return await api.del(BASE_URL + endpoints.character + `/${id}`);
}

export const dataService = {
    getAllCharacters,
    createCharacter,
    getCharacterDetails,
    updateCharacter,
    deleteCharacter,
};