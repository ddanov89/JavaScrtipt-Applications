import { html, render } from "./node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js";

const root = document.getElementById('contacts');
root.addEventListener('click', onClickHandler);

const cardTemplate = (contact) => html
    `
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id=${contact.id}>
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>
            </div>
        </div>
`;

render(contacts.map(cardTemplate), root);

function onClickHandler(e) {
    if (e.target.classList.contains('detailsBtn')) {
        const details = e.target.parentElement.querySelector('.details');
        const isHidden = details.style.display != 'block';
        details.style.display = isHidden ? 'block' : 'none';
    }
}