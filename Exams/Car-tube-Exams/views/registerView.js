import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const registerTemplate = () => html`
<section id="register">
            <div class="container">
                <form @submit=${onRegister} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
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
    const username = formData.get('username');
    const password = formData.get('password');
    const rePass = formData.get('repeatPass');
    if (!username || !password || !rePass) {
        return alert('All fields are required!');
    }
    if (password !== rePass) {
        return alert('Passwords don\'t match!');
    }

    const data = await authService.register({ username, password });
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/');
}