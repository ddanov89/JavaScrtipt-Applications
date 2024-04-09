import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const dashboardTemplate = (characters) => html`
<h2>Characters</h2>
    <section id="characters">
        ${characters.length > 0
        ?
        characters.map(characterTemplate)
        :
        html`
        <h2>No added Heroes yet.</h2>
        `
        }
    </section>
`;

const characterTemplate = (character) => html`
<div class="character">
            <img src='../.${character.imageUrl}' alt="example3" />
            <div class="hero-info">
              <h3 class="category">${character.category}</h3>
              <p class="description">${character.description}</p>
              <a class="details-btn" href='/details/${character._id}'>More Info</a>
            </div>
          </div>
`;

export async function showDashboardView(ctx) {
    const charactersData = await dataService.getAllCharacters();
    ctx.render(dashboardTemplate(charactersData));
    
}