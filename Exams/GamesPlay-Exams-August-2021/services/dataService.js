import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    getAllGames: 'games?sortBy=_createdOn%20desc',
    getLatestGames: 'games?sortBy=_createdOn%20desc&distinct=category',
    games: 'games',
    getAllCommentsByGame: (gameId) => `comments?where=gameId%3D%22${gameId}%22`,
    createAComment: 'comments',
}

async function getAllGames() {
    return await api.get(BASE_URL + endpoints.getAllGames);
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.games + `/${id}`);
}
async function getLatestGames() {
    return await api.get(BASE_URL + endpoints.getLatestGames);
}
async function createAGame(data) {
    return await api.post(BASE_URL + endpoints.games, data);
}
async function gameDetails(id) {
    return await api.get(BASE_URL + endpoints.games + `/${id}`);
}
async function updateAGame(id, data) {
    return await api.put(BASE_URL + endpoints.games + `/${id}`, data);
}
async function getAllCommentsByGame(gameId) {
    return await api.get(BASE_URL + endpoints.getAllCommentsByGame(gameId));
}
async function postAComment(data) {
    return await api.post(BASE_URL + endpoints.createAComment, data);
}

export const dataService = {
    getAllGames,
    deleteItem,
    getLatestGames,
    createAGame,
    gameDetails,
    updateAGame,
    getAllCommentsByGame,
    postAComment
};