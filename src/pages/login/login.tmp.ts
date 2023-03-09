import { ROUTES } from "../../routes";

export default `
<form class="form box form--signin">
  <h1 class="form__title">Sign in</h1>
  <div class="form__content">
    <section class="form__inputs">
      {{> form-input placeholder="Enter the username" name="login"}}
      {{> form-input placeholder="Enter the password" name="password"}}
    </section>
    <section class="form__buttons">
      {{> link text="Sign in" modificator="primary" href="${ROUTES.CHATS}"}}
      {{> link text="Create account" href="${ROUTES.REGISTER}"}}
    </section>
  </div>
</form>
`;
