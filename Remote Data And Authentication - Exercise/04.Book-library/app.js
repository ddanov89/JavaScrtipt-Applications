document.getElementById('loadBooks').addEventListener('click', onLoadAllBooks);
let url = 'http://localhost:3030/jsonstore/collections/books';
let tableContainer = document.getElementsByTagName('tbody')[0];
let buttonRef = document.getElementsByTagName('form')[0].children[5];
buttonRef.addEventListener('click', onSubmit);
let editFormRef = document.getElementsByTagName('form')[0];
let saveBtn = createElement('button', "Save");


async function onLoadAllBooks(e) {

    try {
        let response = await fetch(url);
        if (!response.ok) {
            let message = await response.json();
            throw message;
        }
        let data = await response.json();
        showBooks(data);
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {

    e.preventDefault();

    let title = document.querySelector("input[name='title']").value;
    let author = document.querySelector("input[name='author']").value;

    if (!title || !author) {

        return;

    } else {
        let book = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ title, author })
        };
        let result = await fetch(url, book);
        let savedBook = await result.json();
        showBooks([savedBook]);
    }
}

function showBooks(data) {
    Array.from(Object.keys(data)).forEach(key => {
        let trContainer = createElement('tr', null);
        let tdTitle = createElement('td', data[key].title);
        let tdAuthor = createElement('td', data[key].author);
        trContainer.appendChild(tdTitle);
        trContainer.appendChild(tdAuthor);
        let tdButtonContainer = createElement('td', null);
        let editBtn = createElement('button', "Edit");
        editBtn.addEventListener('click', onUpdate.bind(null, data, key));
        let deleteBtn = createElement('button', "Delete");
        deleteBtn.addEventListener('click', onDelete.bind(null, key));
        tdButtonContainer.appendChild(editBtn);
        tdButtonContainer.appendChild(deleteBtn);
        trContainer.appendChild(tdButtonContainer);
        tableContainer.appendChild(trContainer);
    });
}

async function onUpdate(data, key, e) {

    editFormRef.children[0].textContent = "Edit FORM";
    editFormRef.children[2].value = data[key].title;
    editFormRef.children[4].value = data[key].author;
    editFormRef.children[5].remove();
    editFormRef.appendChild(saveBtn);
    saveBtn.addEventListener('click', onSave.bind(null, key));

}

async function onSave(key, e) {

    e.preventDefault();

    let updateTitleInfo = editFormRef.children[2].value;
    let updatedAuthorInfo = editFormRef.children[4].value;
    let urlForUPdate = `http://localhost:3030/jsonstore/collections/books/${key}`;

    let book = {
        method: "PUT",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({ author: updatedAuthorInfo, title: updateTitleInfo })
    };

    let response = await fetch(urlForUPdate, book);
    await response.json();
    tableContainer.replaceChildren(new Array());
    onLoadAllBooks();
    editFormRef.reset();
    editFormRef.children[0].textContent = "FORM";
    saveBtn.remove();
    editFormRef.appendChild(buttonRef);
}

async function onDelete(key, e) {
    await fetch(url + "/" + key, { method: "DELETE" });
    let trParent = e.target.parentElement.parentElement;
    trParent.remove();
}

function createElement(type, content) {

    let element = document.createElement(type);
    if (content) {
        element.textContent = content;
    }
    return element;
}