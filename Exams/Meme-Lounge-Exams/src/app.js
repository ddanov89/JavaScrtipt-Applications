import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createView.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showDetailsView } from "../views/detailsVIew.js";
import { showEditView } from "../views/editVIew.js";
import { showHomeView } from "../views/homeVIew.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";
import { showUserProfileView } from "../views/userProfileView.js";


const root = document.querySelector('main');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(updateContext);

page('/index.html', '/');
page('/', showHomeView);
page('/logout', logoutAction);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/create', showCreateView);
page('/dashboard', showDashboardView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteAction);
page('/profile', showUserProfileView);


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
        ctx.goTo('/')
    }
}