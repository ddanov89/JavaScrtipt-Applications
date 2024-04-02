import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";


const registerTemplate = () => html`
<section id="register-page" class="auth">
            <form @submit=${onRegister} id="register">
                <h1 class="title">Register</h1>
                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>
                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>
                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>
                <input type="submit" class="btn submit-btn" value="Register">
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
        return alert('All fields are required!');
    }

    if (password !== rePass) {
        return alert('Both passwords must match!');
    }

    const data = await authService.register({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/dashboard');
}