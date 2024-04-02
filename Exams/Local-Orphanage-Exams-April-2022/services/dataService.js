import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data/';

const endpoints = {
    getAllPosts: 'posts?sortBy=_createdOn%20desc',
    posts: 'posts',
    myPosts: (userId) => `posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    makeADonation: 'donations',
    getTotalDonations: (postId) => `donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    hasDonated: (postId, userId) => `donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function getAllPosts() {
    return await api.get(BASE_URL + endpoints.getAllPosts);
}
async function deletePost(id) {
    return await api.del(BASE_URL + endpoints.posts + `/${id}`);
}
async function createAPost(data) {
    return await api.post(BASE_URL + endpoints.posts, data);
}
async function updatePost(id, data) {
    return await api.put(BASE_URL + endpoints.posts + `/${id}`, data);
}
async function postDetails(id) {
    return await api.get(BASE_URL + endpoints.posts + `/${id}`);
}
async function getMyPosts(userId) {
    return await api.get(BASE_URL + endpoints.myPosts(userId));
}
async function makeADonation(data) {
    return await api.post(BASE_URL + endpoints.makeADonation, data);
}
async function getTotalDonations(postId) {
    return await api.get(BASE_URL + endpoints.getTotalDonations(postId));
}
async function hasDonated(postId, userId) {
    return await api.get(BASE_URL + endpoints.hasDonated(postId, userId));
}

export const dataService = {
    deletePost,
    getAllPosts,
    createAPost,
    updatePost,
    postDetails,
    getMyPosts,
    makeADonation,
    getTotalDonations,
    hasDonated
};