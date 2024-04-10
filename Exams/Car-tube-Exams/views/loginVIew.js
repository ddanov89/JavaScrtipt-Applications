import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const loginTemplate = () => html`
<section id="login">
            <div class="container">
                <form @submit=${onLogin} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>
                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Don't have an account?<a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
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
    const { username, password } = Object.fromEntries(formData);
    if (!username || !password) {
        return alert('All fields are required!');
    }
    const data = await authService.login({ username, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}