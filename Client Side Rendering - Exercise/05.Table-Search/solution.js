import { html, render } from "../node_modules/lit-html/lit-html.js";

const tableBodyRoot = document.querySelector('tbody');

async function solve() {
   let url = 'http://localhost:3030/jsonstore/advanced/table';
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   
   
   let response = await fetch(url);
   let data = await response.json();
   
   let peopleTemplate = (data) => html
   `
   ${Object.values(data).map(rowTemplate)}
   `;
   render(peopleTemplate(data), tableBodyRoot);
   
   function onClick(e) {

      const inputRef = document.getElementById('searchField');

      Array.from(tableBodyRoot.children).forEach(tableRow => {
         tableRow.removeAttribute('class');
      });

      Array.from(tableBodyRoot.children).forEach(tableRow => {
         const dataValuesArr = Array.from(tableRow.children).map(element => element.textContent.toLowerCase());
         dataValuesArr.forEach(el => {
            if (el.includes(inputRef.value.toLowerCase())) {
               tableRow.classList.add('select');
            }
         });
      });
      inputRef.value = '';
   }
   
   function rowTemplate(person) {
      return html`
   <tr>
      <td>${person.firstName} ${person.lastName}</td>
      <td>${person.email}</td>
      <td>${person.course}</td>
   </tr>`;
   }
}

solve();