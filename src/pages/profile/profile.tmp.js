import routes from "../../routes";
import arrowBack from "../../../static/assets/icons/arrow-back.svg";

export default `
<section class="profile">
    <div class="profile__back">
        <a href="${routes.chats}">
            <img src="${arrowBack}" alt="Get back to chats" />
        </a>
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
            {{> link text="Change personal data" href="${routes.error}"}}
            {{> separator}}
            {{> link  text="Change password" href="${routes.error}"}}
            {{> separator}}
            {{> link text="Sign out" href="${routes.login}" modificator="error"}}
        </div>
    </div>
</section>
`
