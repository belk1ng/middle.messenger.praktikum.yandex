import { ROUTES } from "../../routes";

export default `
<form class="form box form--register">
  <h1 class="form__title">Create account</h1>
  <div class="form__content">
    <section class="form__inputs">
      {{> form-input placeholder="Enter the email" name="email"}}
      {{> form-input placeholder="Enter the login" name="login"}}
      {{> form-input placeholder="Enter the name" name="first_name"}}
      {{> form-input placeholder="Enter the lastname" name="second_name"}}
      {{> form-input placeholder="Enter the phone" name="phone"}}
      {{> form-input placeholder="Enter the password" name="password"}}
      {{> form-input placeholder="Enter the password again" name="password_confirm"}}
    </section>

    <section class="form__buttons">
      {{> link text="Create account" modificator="primary" href="${ROUTES.CHATS}"}}
      {{> link text="Sign in" href="${ROUTES.LOGIN}"}}
    </section>
  </div>
</form>
`;
