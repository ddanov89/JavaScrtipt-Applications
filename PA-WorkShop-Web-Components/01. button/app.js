const template = document.getElementById('app-button');

class MyButton extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.shadowRoot.querySelector('button').textContent = this.getAttribute('text');
        this.shadowRoot.querySelector('button').classList.add(this.getAttribute('type'));

    }
}

window.customElements.define('app-button', MyButton);