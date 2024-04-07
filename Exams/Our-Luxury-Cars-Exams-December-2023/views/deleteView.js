import { dataService } from "../services/dataService.js";

export async function deleteItem(ctx) {
    const id = ctx.params.id;
    const response = confirm("Are you sure?");
    if (response) {
        await dataService.deleteItem(id);
        ctx.goTo('/dashboard');
    }
}