import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { showCreateView } from "../views/createView.js";
import { authService } from "../services/authService.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";
import { showDashboardView } from "../views/dashboardView.js";
import { showLoginView } from "../views/loginView.js";
import { showRegisterView } from "../views/registerView.js";
import { showEditView } from "../views/editView.js";
import { showMyPostsView } from "../views/myPostsView.js";
import { showDetailsView } from "../views/detailsView.js";

const root = document.getElementById('main-content');
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

page(updateContext);
page('/index.html', '/');
page('/', showDashboardView);
page('/login', showLoginView);
page('/logout', logoutAction);
page('/delete/:id', deleteAction);
page('/dashboard', showDashboardView);
page('/register', showRegisterView);
page('/create', showCreateView);
page('/edit/:id', showEditView);
page('/myPosts', showMyPostsView);
page('/details/:id', showDetailsView);

page.start();
updateNav();

function updateNav() {

    const userData = userHelper.getUserData();

    if (userData) {
        userNav.style.display = "inline";
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

    authService.logout();
    userHelper.clearUserData();
    ctx.updateNav();
    ctx.goTo('/');
}

async function deleteAction(ctx) {

    const id = ctx.params.id;
    const choice = confirm('Are you sure?');

    if (choice) {
        await dataService.deletePost(id);
        ctx.goTo('/');
    }
}