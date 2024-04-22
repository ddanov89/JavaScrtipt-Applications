import { getLike, getSingleMovie } from "./dataService.js";
import { getUserId } from "./userHelper.js";

const section = document.getElementById('movie-example');

export async function showDetails(e) {

    e.preventDefault();

    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    section.style.display = 'block';

    const id = e.target.dataset.id;
    const data = await getSingleMovie(id);
    const dataLikes = await getLike(id);
    section.innerHTML = "";
    listDetails(data, dataLikes);
}

function listDetails(data, likesCount) {
    const container = document.createElement('div');
    container.classList.add('container');
    const isOwner = getUserId() === data._ownerId;
    let template =
        `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${data.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src=${data.img} alt="Movie"
            />
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>${data.description}</p>
        </div>
    </div>
    `;

    if (isOwner) {
        temp += 
        `
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <span class="enrolled-span">LIked ${likesCount}</span>
        `;
    } else {
        template += 
        `
        <a class="btn btn-primary" href="likeMovie">Like</a>
        <span class="enrolled-span">Liked ${likesCount}</span>
        `;
    }
    
    container.innerHTML = template;
    container.addEventListener('click', onAction);
    section.appendChild(container);
}

function onAction(e) {
    
}