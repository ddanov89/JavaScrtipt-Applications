import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";
import { notification } from "./notifications.js";

const registerTemplate = () => html`
<section id="registerPage">
            <form @submit=${onRegister} class="registerForm">
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
`;

let context = null;

export function showRegisterView(ctx) {
    context = ctx;
    context.render(registerTemplate());
}

async function onRegister(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (!email || !password || !rePass) {
        return notification("All fields are required!");
    }
    if (password !== rePass) {
        return notification("Both passwords have to match!");
    }
    const data = await authService.register({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}