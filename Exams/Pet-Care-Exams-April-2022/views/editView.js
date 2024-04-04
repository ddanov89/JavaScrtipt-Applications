import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (pet) => html`
<section id="editPage">
            <form @submit=${onEdit} class="editForm">
                <img src=".././images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${pet.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${pet.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {

    context = ctx;
    id = ctx.params.id;
    const pet = await dataService.petDetails(id);

    context.render(editTemplate(pet));
}

async function onEdit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, breed, age, weight, image } = Object.fromEntries(formData);

    if (!name || !breed || !age || !weight || !image) {
        return alert('All fields are required!');
    }

    await dataService.updatePet(id ,{ name, breed, age, weight, image });
    context.goTo(`/details/${id}`);
}