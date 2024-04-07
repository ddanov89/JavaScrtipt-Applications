const USER_DATA = "userData";

function getUserData() {
    return sessionStorage.getItem(USER_DATA) && JSON.parse(sessionStorage.getItem(USER_DATA));
}

function setUserData(userData) {
    sessionStorage.setItem(USER_DATA, JSON.stringify(userData));
}

function clearUSerData() {
    sessionStorage.removeItem(USER_DATA);
}

function getUserToken(){
    const userData = getUserData();
    return userData?.accessToken;
}

function getUserId() {
    const userData = getUserData();
    return userData?._id;    
}

function hasOwner(ownerID) {
    const id = getUserId();
    return ownerID === id;
}

export const userHelper = {
    getUserData,
    setUserData,
    clearUSerData,
    getUserToken,
    getUserId,
    hasOwner
};