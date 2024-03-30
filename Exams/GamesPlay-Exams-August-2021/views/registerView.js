import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const registerTemplate = () => html`
<section id="register-page" class="content auth">
            <form @submit=${onRegister} id="register">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
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
    const rePass = formData.get('confirm-password');
    if (!email || !password || !rePass) {
        return alert("All fields are required!");
    }
    if (password !== rePass) {
        return alert('Both passwords must match!');
    }
    const data = await authService.register({ email, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}