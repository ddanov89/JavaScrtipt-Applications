import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const loginTemplate = () => html`
<section id="loginPage">
            <form @submit=${onLogin} class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>
                <button class="btn" type="submit">Login</button>
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
`;

let context = null;

export function showLoginTemplate(ctx) {
    context = ctx;
    context.render(loginTemplate());
}

async function onLogin(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        return alert("All fields are required!");
    }
    const data = await authService.login({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}