import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const userProfileTemplate = (meme, user, isOWner) => html`
<section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="${user.gender === 'female' 
                ? './images/female.png' 
                : './images/male.png'}">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${meme.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">${user.title}</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) --> 
                ${isOWner
        ? html`<div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="/images/1.png">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>`
        : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>
`;

export async function showUserProfileView(ctx) {
    const user = userHelper.getUserData();
    const userId = user._id;
    const meme = await dataService.getUserProfile(userId);
    const isOwner = userHelper.isOWner(meme._ownerId);
    ctx.render(userProfileTemplate(meme, user, isOwner));
}