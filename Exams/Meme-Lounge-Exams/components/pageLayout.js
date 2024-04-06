import { html } from '../node_modules/lit-html/lit-html.js'
import { Header } from './header.js'
import { Footer } from './footer.js'

const PageLayout = (...children) => html`
    ${Header()}
    <main>
        ${children}
    </main>
    ${Footer()}`

export { PageLayout }