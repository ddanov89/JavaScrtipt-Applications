import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const loginTemplate = () => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input type="password" name="password" id="password" placeholder="password"/>
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

let context = null;

export function showLogin(ctx) {
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
    const userData = await authService.login({ email, password });
    userHelper.setUserData(userData);
    context.updateNav();
    context.goTo('/dashboard');
}