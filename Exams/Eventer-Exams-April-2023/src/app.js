import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createVIew.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHome } from "../views/homeView.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";


const root = document.querySelector('main');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(updateContext);
page('/index.html', '/');
page('/', showHome);
page('/login', showLoginView);
page('/logout', logoutAction);
page('/register', showRegisterView);
page('/delete/:id', deleteAction);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);

page.start();
updateNav();

function updateNav() {

    const userData = userHelper.getUserData();

    if (userData) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}

function renderer(template) {
    render(template, root);
}

export function updateContext(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next();
}

function goTo(path) {
    page.redirect(path);
}

async function logoutAction(ctx) {
    await authService.logout();
    ctx.updateNav();
    ctx.goTo('/');
}

async function deleteAction(ctx) {
    const id = ctx.params.id;
    const choice = confirm("Are you sure?");
    if (choice) {
        await dataService.deleteItem(id);
        ctx.goTo('/');
    }
}