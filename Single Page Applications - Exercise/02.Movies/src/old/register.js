import { updateNav } from "../app.js";
import { showHome } from "./home.js";
import { setUserData } from "./userHelper.js";
import { register } from "./userService.js";

document.getElementById('register-form').addEventListener('submit', onRegister);

export function showRegisterVIew() {
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    document.getElementById('form-sign-up').style.display = 'block';
}

async function onRegister(e) {

    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (!email || !password || password.length < 6 || password !== rePass) {
       return alert('Error from Register');
    }

    const data = await register({ email, password });

    setUserData(data);
    updateNav();
    showHome();
}
