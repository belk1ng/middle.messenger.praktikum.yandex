import routes from "../../routes";
// import arrowIcon from "../../../static/assets/icons/chevron-right.ts";

export default `
<div class="chat-page">
    <section class="chat-page__list">
        <div class="chat-page__list-header">
            <a class="chat-page__profile-link" href="${routes.profile}">
                Profile
                <span class="chat-page__profile-vector"></span>
            </a>
            {{> chat-search}}
        </div>
        <ul class="chat-list">
            {{#each chats}}
                {{> chat-item}}
            {{/each}}
        </ul>
    </section>
    <section class="chat-page__plug">
        <p>
            Select a chat to send a message
        </p>
    </section>
</div>
`;
