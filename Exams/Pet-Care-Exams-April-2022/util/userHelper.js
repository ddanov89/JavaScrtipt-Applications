const USER_DATA = 'userData';

function getUserData() {
    return sessionStorage.getItem(USER_DATA) && JSON.parse(sessionStorage.getItem(USER_DATA));
}

function setUserData(data) {
    sessionStorage.setItem(USER_DATA, JSON.stringify(data));
}

function clearUSerData() {
    sessionStorage.removeItem(USER_DATA);
}

function getUserToken() {
    const userData = getUserData();
    return userData?.accessToken;
}
function isOWner(id) {

    const userData = getUserData();
    const userID = userData?._id;
    return userID == id;
}

export const userHelper = {
    getUserData,
    setUserData,
    clearUSerData,
    getUserToken,
    isOWner
};