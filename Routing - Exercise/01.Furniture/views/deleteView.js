import { dataService } from "../service/dataService.js";

export async function deleteItem(ctx) {
    const id = ctx.params.id;
    const response = confirm('Are you sure, you would like to delete the item?');

    if (response) {
        await dataService.deleteFurniture(id);
        ctx.goTo('/');
    }
}