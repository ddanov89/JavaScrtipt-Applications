import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showCreateView } from "../views/createView.js";
import { showDetailsView } from "../views/detailsView.js";
import { showEditView } from "../views/editView.js";
import { showHomeView } from "../views/homeView.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";

const root = document.querySelector('main');
const userNav = document.querySelectorAll('.user');
const guestNav = document.querySelectorAll('.guest');
const welcomeMsg = document.getElementById('welcome-msg');

page(updateContext);
page('/index.html', '/');
page('/', showHomeView);
page('/home', showHomeView);
page('/logout', logoutAction);
page('/delete/:id', deleteAction);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/addMovie', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);

page.start();
updateNav();

function updateNav() {

    const userData = userHelper.getUserData();

    if (userData) {
        welcomeMsg.textContent = `Welcome, ${userData.email}`;
        userNav.forEach(x => x.style.display = 'block');
        guestNav.forEach(x => x.style.display = 'none');
    } else {
        userNav.forEach(x => x.style.display = 'none');
        guestNav.forEach(x => x.style.display = 'block');
    }
}

function updateContext(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next();
}

function renderer(template) {
    render(template, root);
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
    const movieId = ctx.params.id;
    const choice = confirm('Are you sure?');
    if (choice) {
        await dataService.deleteItem(movieId);
        ctx.goTo('/');
    }
}