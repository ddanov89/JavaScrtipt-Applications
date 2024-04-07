import { userService } from "../services/userService.js";
import { userHelper } from "../util/userHelper.js";


export async function showLogoutView(ctx) {
    await userService.logout();
    userHelper.clearUSerData();
    ctx.updateNav();
    ctx.goTo('/');
}