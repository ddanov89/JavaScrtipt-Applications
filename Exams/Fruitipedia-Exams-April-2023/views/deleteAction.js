import { dataService } from "../services/dataService.js";

export async function deleteAction(ctx) {
    const id = ctx.params.id;
    const response = confirm('Are you sure?');
    if (response) {
        await dataService.deleteFruit(id);
        ctx.goTo('/dashboard');
    }
}