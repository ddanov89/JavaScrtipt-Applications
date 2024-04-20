import { html, render as litRender } from "../node_modules/lit-html/lit-html.js";

const template = (info, onToggle) => html`
<article>
            <h2>
                <slot name="title">Title</slot>
            </h2>
            <button @click=${onToggle} id="btn">${info ? "Hide info" : "Show More"}</button>
            <p style="display: ${info ? 'block' : 'none'};">
                <slot></slot>
            </p>
        </article>
`;

class ToggleArticle extends HTMLElement {
    #root

    constructor() {

        super();
        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.render();
        // this.#root.appendChild(template.content.cloneNode(true));
        // this.#root.querySelector('button').addEventListener('click', this.toggle.bind(this));
    }

    attributeChangedCallback(name, old, value) {
        if (name == 'info' && this.#root.querySelector('p')) {
            this.render();
            // if (value == 'true') {
            //     this.#root.querySelector('button').textContent = 'Hide Info';
            //     this.#root.querySelector('p').style.display = 'block';
            // } else {
            //     this.#root.querySelector('button').textContent = 'Show More';
            //     this.#root.querySelector('p').style.display = 'none';
            // }
        }
    }

    static get observedAttributes() {
        return ['info'];
    }

    toggle() {
        if (this.getAttribute('info') == 'true') {
            this.removeAttribute('info');
        } else {
            this.setAttribute('info', 'true');
        }
        // this.setAttribute('info', this.getAttribute('info') == 'true' ? 'false' : 'true');
    }
    render() {
        litRender(template(this.getAttribute('info') == "true", this.toggle), this.#root, { host: this });
        // this.#root.appendChild(template.content.cloneNode(true));
        // this.#root.querySelector('button').addEventListener('click', this.toggle.bind(this));
    }
}


window.customElements.define('toggle-article', ToggleArticle);