const USER_DATA = 'userData';

function getUserData() {
    return sessionStorage.getItem(USER_DATA) && JSON.parse(sessionStorage.getItem(USER_DATA));
}

function setUserData(data) {
    sessionStorage.setItem(USER_DATA, JSON.stringify(data));
}

function clearUserData() {
    sessionStorage.removeItem(USER_DATA);
}
function isOwner(id) {
    const userData = userHelper.getUserData();
    const userId = userData?._id;
    return userId === id;
}

export const userHelper = {
    setUserData,
    getUserData,
    clearUserData,
    isOwner
};