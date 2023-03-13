import Block from "../../core/Block/Block";
import { BlockProps } from "../../core/Block/types";
import { ROUTES } from "../../routes";
import FormInput from "../../components/form-input/form-input";
import Button from "../../components/button/button";

class RegisterForm extends Block {
  constructor(props: BlockProps) {
    super("form", props);
  }

  render() {
    return `
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
    `;
  }
}

export const registerForm = new RegisterForm({
  events: {
    submit: (event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      if (form) {
        const formData = new FormData(form);
        formData.forEach((value, field) => console.log(`${field}: ${value}`));
      }
    },
  },

  registerButton: new Button({
    text: "Create account",
    type: "submit",
    modificator: "primary",
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
