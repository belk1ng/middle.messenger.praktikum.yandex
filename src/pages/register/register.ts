import { BlockProps } from "@core/Block/types";
import Block from "@core/Block/Block";
import { registerForm } from "./registerForm";

class RegisterPage extends Block {
  constructor(props: BlockProps) {
    super("section", props);
  }

  render() {
    return `
        <section class="register">
            {{{ registerForm }}}
        <section>
    `;
  }
}

const RegisterPageTemplate = new RegisterPage({
  registerForm,
});

export default RegisterPageTemplate;
