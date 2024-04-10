import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createView.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHomeView } from "../views/homeVIew.js";
import { showLoginView } from "../views/loginVIew.js";
import { showMyListingsView } from "../views/myListingsView.js";
import { showRegisterView } from "../views/registerView.js";
import { showSearchView } from "../views/searchView.js";

const root = document.querySelector("#site-content");
const userNav = document.querySelector('#profile');
const guestNav = document.querySelector('#guest');

page(updateContext);

page('/index.html', '/');
page('/', showHomeView);
page('/login', showLoginView);
page('/logout', logoutAction);
page('/delete/:id', deleteAction);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/myListings', showMyListingsView);
page('/search', showSearchView);


page.start();
updateNav();

function updateNav() {

    const userData = userHelper.getUserData();

    if (userData) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
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
    const choice = confirm("Are you sure?");
    if (choice) {
        await dataService.deleteItem(id);
        ctx.goTo('/');
    }
}