const main = document.querySelector('main');

const section = document.querySelector('.comment');

const createCommentFormContainer = document.querySelector('div.answer-comment');

const form = createCommentFormContainer.querySelector('form');

form.addEventListener('submit', onSubmit);

createCommentFormContainer.remove();


const Topic_URI = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const COMMENTS_URI = 'http://localhost:3030/jsonstore/collections/myboard/comments';

let id = "";
section.remove();

export async function showDetails(e) {

    id = e ? e.target.parentElement.dataset.id : id;
    const topic = await getTopic(id);
    const comments = await getAllCommentsById(id);
    const div = document.createElement('div');
    div.classList.add('comment');
    const topicElement = createTopicTemplate(topic);
    div.appendChild(topicElement);
    if (comments !== undefined) {
        Object.values(comments).forEach(comment => {
            const commentElement = createCommentTemplate(comment);
            div.appendChild(commentElement);
        });
    }

    section.replaceChildren(div);
    section.appendChild(createCommentFormContainer);

    main.replaceChildren(section);

}

async function onSubmit(e) {

    e?.preventDefault();

    const formData = new FormData(e.target);
    console.log(...formData.entries());
    const postText = formData.get('postText');
    const username = formData.get('userName');
    const date = new Date().getTime()
    createComment({ postText, username, _topicID: id, date });
    showDetails();
}

async function createComment(data) {
    const response = await fetch(COMMENTS_URI, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

async function getTopic(id) {

    const response = await fetch(Topic_URI + "/" + id);
    const data = await response.json();

    return data;
}

async function getAllCommentsById() {

    const response = await fetch(COMMENTS_URI + "/" + id);
    if (response.status == '204') {
        return;
    }
    const data = await response.json();
    data = await data;
    return Object.values(data).filter(x => x._topicID == id);
}

function createTopicTemplate(data) {

    const date = new Date(data.createDate);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const div = document.createElement('div');
    div.classList.add('header');
    div.innerHTML = `
    <img src="./static/profile.png" alt="avatar">
    <p><span>${data.userName}</span> posted on <time>${dateString}</time></p>
    <p class="post-content">${data.postText}</p>`;
    return div;
}

function createCommentTemplate(data) {

    const date = new Date(data.date);
    const dateStr = `${date.getFullYear}/${date.getMonth() + 1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}:${date.getSeconds()}`;
    const div = document.createElement('div');
    div.id = 'user-comment';

    div.innerHTML =
        `<div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${data.userName}</strong> commented on <time>${dateStr}</time></p>
                <div class="post-content">
                    <p>${data.postText}</p>
                </div>
            </div>
        </div>`
    return div;
}