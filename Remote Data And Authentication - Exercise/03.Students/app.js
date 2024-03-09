document.getElementById('form').addEventListener('submit', onSubmit);
let url = 'http://localhost:3030/jsonstore/collections/students';
window.onload = onLoad();
let tableBodyRef = document.getElementById('results').children[1];

async function onLoad() {
    let response = await fetch(url);
    if (!response.ok) {
        let message = await response.json();
        throw message;
    }
    let data = await response.json();
    Array.from(Object.values(data)).forEach(element => {
        createTableRow(element);
    });
}

async function onSubmit(e) {

    e.preventDefault();


    let formData = new FormData(e.target);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        return;
    } else {

        let student = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
        };

        let result = await fetch(url, student);
        let savedStudent = await result.json();
        createTableRow(savedStudent);
    }
}

function createTableRow(element) {
    let trEl = createElement('tr', null);
    trEl.appendChild(createElement('td', element.firstName));
    trEl.appendChild(createElement('td', element.lastName));
    trEl.appendChild(createElement('td', element.facultyNumber));
    trEl.appendChild(createElement('td', element.grade));
    tableBodyRef.appendChild(trEl);
}

function createElement(type, content) {
    const element = document.createElement(type);
    if (content) {
        element.textContent = content;
    }
    return element;
}