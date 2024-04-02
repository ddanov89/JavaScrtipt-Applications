import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const myPostsTemplate = (posts) => html`
<section id="my-posts-page">
            <h1 class="title">My Posts</h1>
            ${posts.length > 0
        ? posts.map(post => myPostTemplate(post))
        : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
            
        </section>
`;

const myPostTemplate = (post) => html`
<div class="my-posts">
                <div class="post">
                    <h2 class="post-title">${post.title}</h2>
                    <img class="post-image" src="${post.imageUrl}" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${post._id}" class="details-btn btn">Details</a>
                    </div>
                </div>
            </div>
`;

export async function showMyPostsView(ctx) {

    const user = userHelper.getUserData();
    const userId = user._id;
    const posts = await dataService.getMyPosts(userId);
    ctx.render(myPostsTemplate(posts));
}