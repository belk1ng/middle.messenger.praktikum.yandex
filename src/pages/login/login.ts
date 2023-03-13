import { BlockProps } from "../../core/Block/types";
import Block from "../../core/Block/Block";
import { ROUTES } from "../../routes";
import Button from "../../components/button/button";

class LoginPage extends Block {
  constructor(props?: BlockProps) {
    super("section", props);
  }

  render() {
    return `
        <section class="login">
            <form class="form box form--signin">
                <h1 class="form__title">Sign in</h1>
                <div class="form__content">
                    <section class="form__inputs">
                    {{> form-input placeholder="Enter the username" name="login"}}
                    {{> form-input placeholder="Enter the password" name="password"}}
                    </section>
                    <section class="form__buttons">
                    {{{ submitButton }}}
                    {{> link text="Create account" href="${ROUTES.REGISTER}"}}
                    </section>
                </div>
            </form>
        <section>
    `;
  }
}

const LoginPageTemplate = new LoginPage({
  submitButton: new Button({
    text: "Sign In",
    type: "submit",
    modificator: "primary",
    events: {
      click: (event) => {
        event.preventDefault();
        console.log(this);
      },
    },
  }),
});

export default LoginPageTemplate;
