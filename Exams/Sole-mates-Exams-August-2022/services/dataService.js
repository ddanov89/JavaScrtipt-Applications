import { api } from "../util/requester.js";

const BASE_URL = 'http://localhost:3030/data';

const endpoints = {
    allProducts: '/shoes?sortBy=_createdOn%20desc',
    shoes: '/shoes',
    getProductsByBrand : (query) => `/shoes?where=brand%20LIKE%20%22${query}%22`
};

async function getAllProducts() {
    return await api.get(BASE_URL + endpoints.allProducts);
}
async function createAProduct(data) {
    return await api.post(BASE_URL + endpoints.shoes, data);
}
async function productDetails(id) {
    return await api.get(BASE_URL + endpoints.shoes + `/${id}`);
}
async function deleteProduct(id) {
    return await api.del(BASE_URL + endpoints.shoes + `/${id}`);
}
async function updateProduct(id, data) {
    return await api.put(BASE_URL + endpoints.shoes + `/${id}`, data);
}
async function getProductsByBrand(id) {
    return await api.get(BASE_URL + endpoints.getProductsByBrand(id));
}

export const dataService = {
    getAllProducts,
    createAProduct,
    productDetails,
    updateProduct,
    deleteProduct,
    getProductsByBrand
};