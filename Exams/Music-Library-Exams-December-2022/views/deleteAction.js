import { dataService } from "../services/dataService.js";

export async function deleteAction(ctx) {
    const id = ctx.params.id;
    const choice = confirm("Are you sure?");
    if (choice) {
        await dataService.deleteAlbum(id);
        ctx.goTo('/dashboard');
    }
}