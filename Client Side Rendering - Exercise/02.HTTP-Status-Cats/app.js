import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const root = document.getElementById('allCats');

const catCard = (cat) => html
    `
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${onShow.bind(null, cat.statusCode)} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.statusCode}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const catsTemplate = (cats) => html 
`
<ul>
    ${cats.map(catCard)}
</ul>
`;

function onShow(statusCode, e) {
    e.preventDefault();
    if (e.target.textContent == "Show status code") {
        document.getElementById(statusCode).style.display = 'block';
        e.target.textContent = 'Hide status code';
    } else {
        document.getElementById(statusCode).style.display = 'none';
        e.target.textContent = 'Show status code';
    }
}
render(catsTemplate(cats), root);