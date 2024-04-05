import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCatalogView } from "../views/catalogueView.js";
import { showCreateView } from "../views/createView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHomeView } from "../views/homeView.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";
import { showSearchView } from "../views/searchView.js";

const root = document.querySelector('#main-content');

page(updateContext);

page('/index.html', "/");
page('/', showHomeView);
page('/home', showHomeView);
page('/login', showLoginView);
page('/logout', logoutAction);
page('/register', showRegisterView);
page('/delete/:id', deleteAction);
page('/catalog', showCatalogView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/search', showSearchView);

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
    userHelper.clearUserData();
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