import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const registerTemplate = () => html`
<section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
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
    const rePass = formData.get('conf-pass');

    if (!email || !password || !rePass) {
        return alert("All fields are required!");
    }
    if (password !== rePass) {
        return alert("Both passwords have to match!");
    }
    const data = await authService.register({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}