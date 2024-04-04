import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createView.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHomeTemplate } from "../views/homeView.js";
import { showLoginTemplate } from "../views/loginVIew.js";
import { showRegisterView } from "../views/registerView.js";

const root = document.querySelector('#content');

page(updateContext);
page('/index.html', '/');
page('/', showHomeTemplate);
page('/logout', logoutAction);
page('/delete/:id', deleteAction);
page('/login', showLoginTemplate);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);

page.start();
updateNav();

function updateNav() {

    const user = userHelper.getUserData();

    if (user) {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'inline');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline');
    }
}

function renderer(template) {

    render(template, root);
}

function updateContext(ctx, next) {

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
    userHelper.clearUSerData();
    ctx.updateNav();
    ctx.goTo('/');
}

async function deleteAction(ctx) {

    const id = ctx.params.id;

    const choice = confirm('Are you sure?');

    if (choice) {
        await dataService.deleteItem(id);
        ctx.goTo('/');
    }
}