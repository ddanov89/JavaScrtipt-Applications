const USER_DATA = 'userData';

function getUserData() {
    return sessionStorage.getItem(USER_DATA) && JSON.parse(sessionStorage.getItem(USER_DATA));
}

function setUserData(data) {
    sessionStorage.setItem(USER_DATA, JSON.stringify(data));
}

function getUserToken() {
    const userData = getUserData();
    return userData?.accessToken;
}

function clearUSerData() {
    sessionStorage.removeItem(USER_DATA);
}

function isOwner(id) {
    const userData = getUserData();
    const userID = userData?._id;
    return userID === id;
}


export const userHelper = {
    getUserData,
    getUserToken,
    setUserData,
    clearUSerData,
    isOwner,
};