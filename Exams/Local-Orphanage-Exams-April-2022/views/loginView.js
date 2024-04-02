import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const loginTemplate = () => html`
<section id="login-page" class="auth">
            <form @submit=${onLogin} id="login">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>
                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>
                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
        </section>
`;

let context = null;

export function showLoginView(ctx) {
    context = ctx;
    context.render(loginTemplate());
}

async function onLogin(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        return alert('All fields are required!');
    }
    const data = await authService.login({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/dashboard');
}