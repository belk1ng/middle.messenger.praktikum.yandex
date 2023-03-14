import { ROUTES } from "@src/routes";

export default `
<section class="profile">
    <div class="profile__back">
        <a href="${ROUTES.CHATS}"></a>
    </div>

    <div class="profile__info">
        <img class="profile__avatar" alt="Your avatar" src="https://avatars.githubusercontent.com/u/62993219?v=4" />
        <h1 class="profile__name">Name</h1>

        <ul class="profile__list">
            {{> profile-row field="Email" value="pochta@mail.ru"}}
            {{> separator}}
            {{> profile-row field="Login" value="login"}}
            {{> separator}}
            {{> profile-row field="First name" value="First"}}
            {{> separator}}
            {{> profile-row field="Last name" value="Last"}}
            {{> separator}}
            {{> profile-row field="Username" value="Username"}}
            {{> separator}}
            {{> profile-row field="Phone" value="88005553535"}}
        </ul>

        <div class="profile__actions">
            {{> link text="Change personal data" href="${ROUTES.SERVER_ERROR}"}}
            {{> separator}}
            {{> link  text="Change password" href="${ROUTES.SERVER_ERROR}"}}
            {{> separator}}
            {{> link text="Sign out" href="${ROUTES.LOGIN}" modificator="error"}}
        </div>
    </div>
</section>
`;
