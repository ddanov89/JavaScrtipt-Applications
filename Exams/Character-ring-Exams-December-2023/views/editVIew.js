import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const editTemplate = (character) => html`
<section id="edit">
          <div class="form">
            <img class="border" src='"./images/border.png"' alt="">
            <h2>Edit Character</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              .value=${character.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${character.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >${character.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
          >${character.moreInfo}</textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`;

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const id = context.params.id;
    const character = await dataService.getCharacterDetails(id);
    context.render(editTemplate(character));
}

async function onSubmit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');

    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields must be filled!");
    }
    const characterID = context.params.id;
    await dataService.updateCharacter({category, imageUrl, description, moreInfo}, characterID);
    context.goTo(`/details/${characterID}`);
}