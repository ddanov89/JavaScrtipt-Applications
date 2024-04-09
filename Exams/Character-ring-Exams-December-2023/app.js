import { render } from "./node_modules/lit-html/lit-html.js";
import page from './node_modules/page/page.mjs';
import { authService } from "./service/authService.js";
import { userHelper } from "./util/userHelper.js";
import { showCreateView } from "./views/createVIew.js";
import { showDashboardView } from "./views/dashboardView.js";
import { deleteAction } from "./views/deleteView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editVIew.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";

const root = document.querySelector('main');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(updateContext);

page('/index.html', "/");
page('/', showHomeView);
page('/home', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteAction);
page('/logout', logoutAction);

page.start();
updateNav();

async function updateNav() {

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

function updateContext(context, next) {

    context.render = renderer;
    context.updateNav = updateNav;
    context.goTo = goTo;
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