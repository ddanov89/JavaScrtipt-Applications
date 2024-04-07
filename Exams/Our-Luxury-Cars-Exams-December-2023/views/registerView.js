import { html } from "../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { userHelper } from "../util/userHelper.js";

const showRegisterTemplate = () => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="register-form">
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
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`;
let context = null;
export function showRegisterView(ctx) {
    context = ctx;
    context.render(showRegisterTemplate());
}

async function onRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');
    if (!email || !password || password !== rePassword) {
        return alert('Registration error. Email and password does not match!');
    }
    const userData = await userService.register({ email, password });
    userHelper.setUserData(userData);
    context.updateNav();
    context.goTo('/');
}