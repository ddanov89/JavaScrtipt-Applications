import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    getAllRecords: 'cyberpunk?sortBy=_createdOn%20desc',
    record: 'cyberpunk',
};

async function getAllRecords() {
    return await api.get(BASE_URL + endpoints.getAllRecords);
}

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.record + `/${id}`);
}

async function createARecord(data) {
    return await api.post(BASE_URL + endpoints.record, data);
}
async function recordDetails(id) {
    return await api.get(BASE_URL + endpoints.record + `/${id}`);
}
async function updateARecord(id, data) {
    return await api.put(BASE_URL + endpoints.record + `/${id}`, data);
}

export const dataService = {
    deleteItem,
    getAllRecords,
    createARecord,
    recordDetails,
    updateARecord,
};