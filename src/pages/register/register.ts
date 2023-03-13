import { BlockProps } from "../../core/Block/types";
import Block from "../../core/Block/Block";
import { ROUTES } from "../../routes";
import Button from "../../components/button/button";
import FormInput from "../../components/form-input/form-input";

class RegisterPage extends Block {
  constructor(props: BlockProps) {
    super("section", props);
  }

  render() {
    return `
        <section class="login">
            <form class="form box form--register">
                <h1 class="form__title">Create account</h1>
                <div class="form__content">
                <section class="form__inputs">
                    {{{ emailInput }}}
                    {{{ loginInput }}}
                    {{{ firstNameInput }}}
                    {{{ secondNameInput }}}
                    {{{ phoneInput }}}
                    {{{ passwordInput }}}
                    {{{ passwordConfirmInput }}}
                </section>
            
                <section class="form__buttons">
                    {{{ registerButton }}}
                    {{> link text="Sign in" href="${ROUTES.LOGIN}"}}
                </section>
                </div>
            </form>
        <section>
    `;
  }
}

const RegisterPageTemplate = new RegisterPage({
  registerButton: new Button({
    text: "Create account",
    type: "submit",
    modificator: "primary",
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
  }),
  emailInput: new FormInput({
    placeholder: "Enter the email",
    name: "email",
    type: "email",
  }),
  loginInput: new FormInput({
    placeholder: "Enter the login",
    name: "login",
    type: "text",
  }),
  firstNameInput: new FormInput({
    placeholder: "Enter the first_name",
    name: "first_name",
    type: "text",
  }),
  secondNameInput: new FormInput({
    placeholder: "Enter the second name",
    name: "second_name",
    type: "text",
  }),
  phoneInput: new FormInput({
    placeholder: "Enter the phone",
    name: "phone",
    type: "phone",
  }),
  passwordInput: new FormInput({
    placeholder: "Enter the password",
    name: "password",
    type: "password",
  }),
  passwordConfirmInput: new FormInput({
    placeholder: "Enter the password again",
    name: "confirm_password",
    type: "password",
  }),
});

export default RegisterPageTemplate;
