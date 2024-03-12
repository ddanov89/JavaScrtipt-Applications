import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', onSubmit);

const townPreview = (town) => html
    `
<li>
    ${town}
</li>
`;

const townsTemplate = (towns) => html
    `
<ul>
    ${towns.map(townPreview)}
</ul>
`;

let root = document.getElementById('root');



function onSubmit(e) {
    e.preventDefault();
    let inputRef = document.getElementById('towns');
    let towns = inputRef.value.split(', ');
    render(townsTemplate(towns), root);
    inputRef.value = '';
}