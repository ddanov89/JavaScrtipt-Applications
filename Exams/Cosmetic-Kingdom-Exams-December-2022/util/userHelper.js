const USER_DATA = "userData";

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
    const user = userHelper.getUserData();
    const userID = user?._id;
    return userID == id;
}

export const userHelper = {
    getUserData, setUserData, clearUserData, isOwner
};