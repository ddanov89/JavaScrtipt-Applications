import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const dashboardTemplate = (solutions) => html`
<h2>Solutions</h2>
        <section id="solutions">
          ${solutions && solutions.length > 0
        ? solutions.map(solution => solutionCardTemplate(solution))
        : html`<h2 id="no-solution">No Solutions Added.</h2>`
    }
        </section>
`;

const solutionCardTemplate = (solution) => html`
<div class="solution">
            <img src="../.${solution.imageUrl}" alt="example1" />
            <div class="solution-info">
              <h3 class="type">${solution.type}</h3>
              <p class="description">${solution.description}</p>
              <a class="details-btn" href="/details/${solution._id}">Learn More</a>
            </div>
          </div>
`;

export async function showDashboardView(ctx) {
    const solutions = await dataService.getAllSolutions();
    ctx.render(dashboardTemplate(solutions));
}