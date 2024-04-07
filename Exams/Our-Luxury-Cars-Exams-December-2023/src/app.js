import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userHelper } from "../util/userHelper.js";
import { showHomeView } from "../views/homeVIew.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";
import { showLogoutView } from "../views/logoutView.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showCreateView } from "../views/createCarView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { deleteItem } from "../views/deleteView.js";
import { showSearchView } from "../views/searchView.js";

const root = document.getElementById('main-element');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(updateContext);
page('/', showHomeView);
page('/home', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', showLogoutView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteItem);
page('/search', showSearchView);

page.start();
updateNav();

function renderer(template) {
    render(template, root);
}

function updateContext(context, next) {
    context.render = renderer;
    context.updateNav = updateNav;
    context.goTo = goTo;
    next();
}

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

function goTo(path) {
    page.redirect(path);
}