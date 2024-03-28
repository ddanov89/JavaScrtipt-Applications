import { dataService } from "../service/dataService.js";

export async function deleteAction(ctx) {
    const id = ctx.params.id;
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
        await dataService.deleteFact(id);
        ctx.goTo('/dashboard');
    }
}