import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    allProducts: '/products?sortBy=_createdOn%20desc',
    products: '/products',
    getABuy: '/bought',
    getTotalBought: (productId) => `/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    hasBought: (productId, userId) => `/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

async function getAllProducts() {
    return await api.get(BASE_URL + endpoints.allProducts);
}

async function createProduct(data) {
    return await api.post(BASE_URL + endpoints.products, data);
}

async function getProductDetails(id) {
    return await api.get(BASE_URL + endpoints.products + `/${id}`);
}
async function updateAProduct(id, data) {
    return await api.put(BASE_URL + endpoints.products + `/${id}`, data);
}
async function getABuy(data) {
    return await api.post(BASE_URL + endpoints.getABuy, data);
}
async function getTotalBought(productId) {
    return await api.get(BASE_URL + endpoints.getTotalBought(productId));
}
async function hasBought(productId, userId) {
    return await api.get(BASE_URL + endpoints.hasBought(productId, userId));
}
async function deleteProduct(id) {
    return await api.del(BASE_URL + endpoints.products + `/${id}`);
}

export const dataService = {
    getAllProducts,
    createProduct,
    getProductDetails,
    updateAProduct,
    getABuy,
    getTotalBought,
    hasBought,
    deleteProduct
};