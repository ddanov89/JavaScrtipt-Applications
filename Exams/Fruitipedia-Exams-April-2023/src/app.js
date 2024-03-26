import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createView.js";
import { showDashboardView } from "../views/dashboardVIew.js";
import { deleteAction } from "../views/deleteAction.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHomeView } from "../views/homeVIew.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerVIew.js";
import { showSearchView } from "../views/searchView.js";

const root = document.querySelector('main');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(updateContext);

page('/index.html', '/');
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', logoutAction);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteAction);
page('/search', showSearchView);

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

function updateContext(ctx, next) {

    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next();
}

function goTo(path) {

    page.redirect(path);
}

async function logoutAction() {

    await authService.logout();
    updateNav();
    goTo('/');
}