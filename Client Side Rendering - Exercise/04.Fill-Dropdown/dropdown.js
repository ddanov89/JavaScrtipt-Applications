import { html, render } from "../node_modules/lit-html/lit-html.js";

document.querySelector('form').addEventListener('submit', addItem);
const url ='http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.getElementById('menu');

onLoad();

async function onLoad() {
    const response = await fetch(url);
    const data = await response.json();
    const option = Object.values(data).map(option => optionTemplate(option));
    update(option);
}
function optionTemplate(data) {
    return html `<option value=${data._id}>${data.text}</option>`;
}
function update(data) {
    render(data, root);
}

function addItem(e) {
    e.preventDefault();
    const inputRef = document.getElementById('itemText');
    const text = inputRef.value;
    inputRef.value = "";
    addItemInDb({text});
}

async function addItemInDb(data) {
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    onLoad();
    debugger
}