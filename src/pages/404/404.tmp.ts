import { ROUTES } from "@src/routes";

export default `
<section class="error-page">
    <p class="error-page__code">404</p>
    <p class="error-page__text">Page not found :(</p>

    {{> link text="Back to chats" href="${ROUTES.CHATS}"}}
</section>
`;
