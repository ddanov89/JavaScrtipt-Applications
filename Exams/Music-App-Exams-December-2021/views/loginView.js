import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const loginTemplate = () => html`
<section id="loginPage">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
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
    const {email, password} = Object.fromEntries(formData);
    if (!email || !password) {
        return alert('All fields are required!');
    }
    const data = await authService.login({email, password});
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}

