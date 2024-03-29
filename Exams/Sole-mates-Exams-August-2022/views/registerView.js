import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../services/authService.js";
import { userHelper } from "../util/userHelper.js";

const registerView = () => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit =${onRegister} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

let context = null;

export function showRegisterView(ctx) {
    context = ctx;
    context.render(registerView());
}

async function onRegister(event) {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-password');
    if (!email || !password || !rePass) {
        return alert('All fields are required!');
    }
    if (password !== rePass) {
        return alert("Passwords must match!");
    }
    const data = await authService.register({email, password});
    userHelper.setUserData(data);
    context.updateNav();
    context.goTo('/dashboard');
}