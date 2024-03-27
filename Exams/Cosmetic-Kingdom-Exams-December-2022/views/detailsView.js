import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";


const detailsTemplate = (product, hasUser, hasBought, isOwner, totalBought) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="../.${product.imageUrl}" alt="example1"/>
    <p id="details-title">${product.name}</p>
    <p id="details-category">Category: <span id="categories">${product.category}</span></p>
    <p id="details-price"> Price:<span id="price-number">${product.price}</span>$</p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Bought: <span id="buys">${totalBought}</span> times.</h4>
        <span>${product.description}</span>
      </div>
    </div>
      ${hasUser
        ? html`<div id="action-buttons">
              ${isOwner
                ? getButtons(product._id)
                  : (hasBought == 0
                      ? html`<a href="javascript:void(0)" @click=${onBuy} id="buy-btn">Buy</a>`
                : null)}
                </div>`
              : null}
            </div>
</section>
`;

function getButtons(id) {
    return html`
            <a href="/edit/${id}" id="edit-btn">Edit</a>
            <a href="/delete/${id}" id="delete-btn">Delete</a>
    `;
}

let context = null;
let productId = null;
let userId = null;
let hasUser = null;
let isOwner = null;
let hasBought = null;
let product = null;

export async function showDetailsView(ctx) {
    context = ctx;
    productId = ctx.params.id;
    product = await dataService.getProductDetails(productId);
    const user = userHelper.getUserData();
    userId = user?._id;
    hasUser = !!user;
    hasBought = await dataService.hasBought(productId, userId);
    const totalBought = await dataService.getTotalBought(productId);
    isOwner = userHelper.isOwner(product._ownerId);
    context.render(detailsTemplate(product, hasUser, hasBought, isOwner, totalBought));
}

async function onBuy(e) {
    await dataService.getABuy({ productId });
    hasBought = await dataService.hasBought(productId, userId);
    const totalBought = await dataService.getTotalBought(productId);
    context.render(detailsTemplate(product, hasUser, hasBought, isOwner, totalBought));
}