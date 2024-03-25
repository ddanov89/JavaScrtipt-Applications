import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form @submit=${onCreate} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

let context = null;

export function showCreateView(ctx) {
    context = ctx;
    context.render(createTemplate());
}

async function onCreate(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);

    if (!singer || !album || !imageUrl || !release || !label || !sales) {
        return alert("All fields are required!");
    }
    await dataService.createAnAlbum({singer, album, imageUrl, release, label, sales});
    context.goTo('/dashboard');
}