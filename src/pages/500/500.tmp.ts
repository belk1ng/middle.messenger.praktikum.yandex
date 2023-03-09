import { ROUTES } from "../../routes";

export default `
<section class="error-page">
    <p class="error-page__code">500</p>
    <p class="error-page__text">We are already fixing :)</p>

    {{> link text="Back to chats" href="${ROUTES.CHATS}"}}
</section>
`;
