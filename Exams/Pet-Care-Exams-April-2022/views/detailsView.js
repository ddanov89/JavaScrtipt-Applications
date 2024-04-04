import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (pet, hasUser, hasDonated, isOWner, totalDonations) => html`
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${totalDonations}$</h4>
                    </div>
                    ${hasUser
        ? html`<div class="actionBtn">
                        ${isOWner
                ? getButtons(pet._id)
                : (!hasDonated
                    ? html`<a href="javascript:void(0)" @click=${onDonate} class="donate">Donate</a>`
                    : null)}
                    </div>`
        : null}
                </div>
            </div>
        </section>
`;

function getButtons(id) {
    return html`
    <a href="/edit/${id}" class="edit">Edit</a>
    <a href="/delete/${id}" class="remove">Delete</a>
    `;
}

let context = null;
let petId = null;
let pet = null;
let hasUser = null;
let userId = null;
let isOWner = null;

export async function showDetailsView(ctx) {

    context = ctx;
    petId = ctx.params.id;
    pet = await dataService.petDetails(petId);
    const user = userHelper.getUserData();
    userId = user?._id;
    hasUser = !!user;
    const totalDonations = await dataService.getAllDonations(petId) * 100;
    const hasDonated = await dataService.hasDonated(petId, userId);
    isOWner = userHelper.isOWner(pet._ownerId);
    context.render(detailsTemplate(pet, hasUser, hasDonated, isOWner, totalDonations));
}

async function onDonate(event) {

    await dataService.makeADonation({ petId });
    const totalDonations = (await dataService.getAllDonations(petId)) * 100;
    const hasDonated = await dataService.hasDonated(petId, userId);
    context.render(detailsTemplate(pet, hasUser, hasDonated, isOWner, totalDonations));
}