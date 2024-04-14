import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    events: "events",
    getAllEvents: 'events?sortBy=_createdOn%20desc',
    postAGoing: 'going',
    getTotalGoing: (eventId) => `going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    isGoing: (eventId, userId) => `going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.events + `/${id}`);
}
async function getAllEvents() {
    return await api.get(BASE_URL + endpoints.getAllEvents);
}

async function createAnEvent(data) {
    return await api.post(BASE_URL + endpoints.events, data);
}
async function eventDetails(id) {
    return await api.get(BASE_URL + endpoints.events + `/${id}`);
}
async function updateAnEvent(id, data) {
    return await api.put(BASE_URL + endpoints.events + `/${id}`, data);
}

async function postAGoing(data) {
    return await api.post(BASE_URL + endpoints.postAGoing, data);
}
async function getTotalGoing(eventId) {
    return await api.get(BASE_URL + endpoints.getTotalGoing(eventId));
}
async function isGoing(eventId, userId) {
    return await api.get(BASE_URL + endpoints.isGoing(eventId, userId));
}

export const dataService = {
  deleteItem,
  getAllEvents,
  createAnEvent,
  eventDetails,
  updateAnEvent,
  postAGoing,
  getTotalGoing,
  isGoing
};
