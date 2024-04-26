
function setUserData(userData) {    
    sessionStorage.setItem('userData', JSON.stringify(userData));
}
function getUserData() {
    return sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
}

function clearUserData(){
    sessionStorage.removeItem('userData');
}

function getUserToken() {
    const userData = getUserData();
    return userData?.accessToken;
}

function getUserID() {
    const userData = getUserData();
    return userData?._id;
}

function hasOwner(ownerID) {
    const id = getUserID();
    return ownerID === id;
}

export const userHelper = {
    setUserData,
    getUserData,
    clearUserData,
    getUserToken,
    getUserID,
    hasOwner
};