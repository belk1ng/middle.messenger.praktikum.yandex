import { BlockProps } from "../../core/Block/types";
import Block from "../../core/Block/Block";
import { ROUTES } from "../../routes";
import Button from "../../components/button/button";
import FormInput from "../../components/form-input/form-input";

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
                    {{{ loginInput }}}
                    {{{ passwordInput }}}
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
  loginInput: new FormInput({
    placeholder: "Enter the login",
    name: "login",
  }),
  passwordInput: new FormInput({
    placeholder: "Enter the password",
    name: "password",
  }),
});

export default LoginPageTemplate;
