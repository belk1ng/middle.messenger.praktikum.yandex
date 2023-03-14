import Block from "@core/Block/Block";
import { BlockProps } from "@core/Block/types";
import { ROUTES } from "@src/routes";
import FormInput from "@components/form-input/form-input";
import Button from "@components/button/button";

class LoginForm extends Block {
  constructor(props: BlockProps) {
    super("form", props);
  }

  render() {
    return `
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
    `;
  }
}

export const loginForm = new LoginForm({
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

  submitButton: new Button({
    text: "Sign In",
    type: "submit",
    modificator: "primary",
  }),
  loginInput: new FormInput({
    placeholder: "Enter the login",
    name: "login",
    type: "text",
  }),
  passwordInput: new FormInput({
    placeholder: "Enter the password",
    name: "password",
    type: "password",
  }),
});
