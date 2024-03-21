document.querySelector("a[id='home']").classList.add('active');
document.getElementById('logout').addEventListener('click', onLogout);
document.querySelector(".load").addEventListener('click', onLoadCatch);
document.getElementById('addForm').addEventListener('submit', onCreate);

const userNavRef = document.getElementById("user");
const guestNavRef = document.getElementById('guest');
const addBtnRef = document.querySelector('.add');
const catchesContainerRef = document.getElementById('catches');

const endpoints = {
    logout: 'http://localhost:3030/users/logout',
    catches: 'http://localhost:3030/data/catches',
    updateCatch: 'http://localhost:3030/data/catches/',
};

let userData = JSON.parse(sessionStorage.getItem('userData'));

function hasOwner(id) {

    return userData?._id === id;
}

updateNav();

function updateNav() {

    if (userData) {
        document.querySelector('nav p span').textContent = userData.email;
        userNavRef.style.display = 'inline-block';
        guestNavRef.style.display = 'none'
        addBtnRef.disabled = false;
    } else {
        document.querySelector('nav p span').textContent = "guest";
        userNavRef.style.display = 'none';
        guestNavRef.style.display = 'inline-block';
        addBtnRef.disabled = true;
    }
}

async function onLogout(e) {

    let option = {
        method: "GET",
        headers: {
            "X-Authorization": userData.accessToken
        }
    }

    await fetch(endpoints.logout, option);
    sessionStorage.clear();
    userData = null;
    await onLoadCatch();
    updateNav();
}

async function onLoadCatch(e) {
    const response = await fetch(endpoints.catches);
    const data = await response.json();
    catchesContainerRef.innerHTML = "";

    data.forEach(x => {
        let div = listCatches(x);
        catchesContainerRef.appendChild(div);
    });
}

function listCatches(data) {
    let isOwner = hasOwner(data._ownerId);
    let div = document.createElement('div');
    div.classList.add('catch');

    div.innerHTML += `<label>Angler</label>`;
    div.innerHTML += `<input type="text" class="angler" ${!isOwner ? 'disabled' : ""} value="${data.angler}">`;
    div.innerHTML += `<label>Weight</label>`;
    div.innerHTML += `<input type="text" class="weight" ${!isOwner ? 'disabled' : ""} value="${data.weight}">`
    div.innerHTML += `<label>Species</label>`;
    div.innerHTML += `<input type="text" class="species" ${!isOwner ? 'disabled' : ""} value="${data.species}">`;
    div.innerHTML += `<label>Location</label>`;
    div.innerHTML += `<input type="text" class="location" ${!isOwner ? 'disabled' : ""} value="${data.location}">`;
    div.innerHTML += `<label>Bait</label>`;
    div.innerHTML += `<input type="text" class="bait" ${!isOwner ? 'disabled' : ""} value="${data.bait}">`;
    div.innerHTML += `<label>Capture Time</label>`;
    div.innerHTML += `<input type="number" class="captureTime" ${!isOwner ? 'disabled' : ""} value="${data.captureTime}">`;

    const updateBtn = document.createElement('button');
    updateBtn.textContent = "Update";
    updateBtn.classList.add('update');
    updateBtn.dataset.id = data._id;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.dataset.id = data._id;

    if (!hasOwner(data._ownerId)) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }

    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    updateBtn.addEventListener('click', onUpdate);
    deleteBtn.addEventListener('click', onDelete);

    return div;
}

async function onCreate(e) {

    e.preventDefault();
    let formData = new FormData(e.target);
    let angler = formData.get('angler');
    let weight = formData.get('weight');
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');
    let _ownerId = userData._id;

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return;
    }

    let data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId
    };

    const option = createOption('POST', data);
    await fetch(endpoints.catches, option);
    onLoadCatch();

}

async function onUpdate(e) {
    let parentDiv = e.target.parentElement;
    let angler = parentDiv.querySelector(".angler").value;
    let weight = parentDiv.querySelector('.weight').value;
    let species = parentDiv.querySelector('.species').value;
    let location = parentDiv.querySelector('.location').value;
    let bait = parentDiv.querySelector('.bait').value;
    let captureTime = parentDiv.querySelector('.captureTime').value;
    let _ownerId = e.target.dataset.id;

    let data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId
    };

    const option = createOption('PUT', data);
    let response = await fetch(endpoints.updateCatch + _ownerId, option);
    debugger
    onLoadCatch();
}

async function onDelete(e) {

    const id = e.target.dataset.id;
    const option = {
        method: "DELETE",
        headers: {
            "X-Authorization": userData.accessToken
        }
    }

    await fetch(endpoints.catches + "/" + id, option);
    onLoadCatch();
}

function createOption(method, data) {
    return {
        method: method,
        headers: {
            "Content-type": "application/json",
            "X-Authorization": userData.accessToken
        },
        body: JSON.stringify(data)
    };
}