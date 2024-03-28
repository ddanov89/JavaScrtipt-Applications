import { authService } from "../service/authService.js";
import { userHelper } from "../util/userHelper.js";

export async function logoutAction(ctx) {
    await authService.logout();
    userHelper.clearUserData();
    ctx.updateNav();
    ctx.goTo('/');
}