import { html } from "../node_modules/lit-html/lit-html.js";
import { authService } from "../service/authService.js";
import { userHelper } from "../util/userHelper.js";

const registerTemplate = () => html`
<section id="register">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Register</h2>
            <form @submit=${onRegister}class="register-form">
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
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
         
        </section>
`;

let context = null;

export function showRegisterView(ctx) {
    context = ctx;
    ctx.render(registerTemplate());
}

async function onRegister(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-password');

    if (!email || !password || !rePass) {
        return alert("All fields must be filled!");
    }
    if (password !== rePass) {
        return alert('Passwords must match!');
    }
    const userData = await authService.register({ email, password });
    userHelper.setUserData(userData);
    context.updateNav();
    context.goTo('/');
}