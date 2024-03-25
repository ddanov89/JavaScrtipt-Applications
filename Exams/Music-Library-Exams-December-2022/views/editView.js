import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";


const editTemplate = (album) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales} />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {
    context = ctx;
    id = ctx.params.id;
    const album = await dataService.getAlbumDetails(id);
    context.render(editTemplate(album));
}

async function onEdit(event) {
    
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);
    
    if (!singer || !album || !imageUrl || !release || !label || !sales) {
        return alert("All fields are required!");
    }
    await dataService.updateAnAlbum(id, { singer, album, imageUrl, release, label, sales });
    context.goTo(`/details/${id}`);
}