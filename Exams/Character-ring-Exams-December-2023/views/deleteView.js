import { dataService } from "../service/dataService.js";


export async function deleteAction(ctx) {
    const id = ctx.params.id;
    const response = confirm("Are you sure?");
    if (response) {
        await dataService.deleteCharacter(id);
    }
    ctx.goTo('/dashboard');
}