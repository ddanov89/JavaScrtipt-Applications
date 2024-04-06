import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";
import { notification } from "./notifications.js";

const loginTemplate = () => html`
<section id="login">
            <form @submit=${onLogin} id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
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
        return notification('All fields are required!');
    }
    const data = await authService.login({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/dashboard');
}