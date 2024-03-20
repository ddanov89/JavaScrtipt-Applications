import { html, render } from "../node_modules/lit-html/lit-html.js";
import { onCreate, onEdit, onDelete } from "./app.js";

let booksTemplate = (bookIDs, data) => html
    `
    <table>
        <thead>
        <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
        </tr>
        </thead>
    <tbody>
    ${bookIDs?.map(bookID => bookTemplate(bookID, data))}
    </tbody>
    </table>
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" @click=${onCreate} value="Submit">
    </form>
    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
    `;

let bookTemplate = (bookID, data) => html
    `
    <tr id=${bookID}>
    <td>${data[bookID].title}</td>
    <td>${data[bookID].author}</td>
    <td>
    <button @click=${onEdit}>Edit</button>
    <button @click=${onDelete}>Delete</button>
    </td>
    </tr>
    `;

export {
    booksTemplate,
    bookTemplate,
    render
};