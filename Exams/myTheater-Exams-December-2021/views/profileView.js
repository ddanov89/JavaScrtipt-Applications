import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const profileTemplate = (theaters, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">
            ${user && theaters.length > 0
        ? theaters.map(event => eventCard(event))
        : html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
    </div>
</section>
`;

const eventCard = (event) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src="${event.imageUrl}">
        <h2>${event.title}</h2>
        <h6>${event.date}</h6>
        <a href="/details/${event._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function showProfileView(ctx) {
    const user = userHelper.getUserData();
    const userId = user._id;
    const theaters = await dataService.getUserProfile(userId);
    ctx.render(profileTemplate(theaters, user));
}