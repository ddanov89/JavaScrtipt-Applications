import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";


const detailsTemplate = (post, hasUser, hasDonated, isOwner, totalDonations) => html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">Description: ${post.description}</p>
                        <p class="post-address">Address: ${post.address}</p>
                        <p class="post-number">Phone number: ${post.phone}</p>
                        <p class="donate-Item">Donate Materials: ${totalDonations}</p>
                        ${hasUser
        ? html`<div class="btns">
                            ${isOwner
                ? getButtons(post._id)
                : (!hasDonated
                    ? html`<a href='javascript:void(0)' @click=${onDonate} class="donate-btn btn">Donate</a>`
                    : null)}
                        </div>`
        : null}
                    </div>
                </div>
            </div>
        </section>
`;

function getButtons(id) {
    return html`
        <a href="/edit/${id}" class="edit-btn btn">Edit</a>
        <a href="/delete/${id}" class="delete-btn btn">Delete</a>
    `;
}

let context = null;
let post = null;
let postId = null;
let userId = null;
let isOwner = null;
let hasUser = null;


export async function showDetailsView(ctx) {

    context = ctx;

    postId = context.params.id;
    hasUser = userHelper.getUserData();
    userId = user._id;

    post = await dataService.postDetails(postId);

    let hasDonated = await dataService.hasDonated(postId, userId);
    hasDonated = !!user;

    isOwner = userHelper.isOwner(post._ownerId);
    const totalDonations = await dataService.getTotalDonations(postId);
    context.render(detailsTemplate(post, hasUser, hasDonated, isOwner, totalDonations));
}

async function onDonate(event) {
    await dataService.makeADonation({ postId });
    const hasDonated = await dataService.hasDonated(postId, userId);
    const totalDonations = await dataService.getTotalDonations(postId);
    context.render(detailsTemplate(post, hasUser, hasDonated, isOwner, totalDonations));
}