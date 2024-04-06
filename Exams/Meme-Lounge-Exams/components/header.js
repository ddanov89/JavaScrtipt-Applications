import { html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { userHelper } from '../util/userHelper.js';
import { authService } from "../services/authService.js";

const getHeaderLinks = (loggedIn) => {
	const email = sessionStorage.getItem('email');

	return loggedIn
		? html`
                <div class="user">
                    <a href="/create">Create Meme</a>
                    <div class="profile">
                        <span>Welcome, ${email}</span>
                        <a href="/profile">My Profile</a>
                        <a href="/logout">Logout</a>
                    </div>
                </div>`
		: html`
                <div class="guest">
                    <div class="profile">
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                    <a class="active" href="/">Home Page</a>
                </div>`
}

const Header = () => html`
    <nav>
        <a href="/memes">All Memes</a>
        ${getHeaderLinks(userHelper.getUserToken())}
    </nav>    `

export { Header }