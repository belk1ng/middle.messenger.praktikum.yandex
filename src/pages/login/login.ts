import { BlockProps } from "@core/Block/types";
import Block from "@core/Block/Block";
import { loginForm } from "./loginForm";

class LoginPage extends Block {
  constructor(props: BlockProps) {
    super("section", props);
  }

  render() {
    return `
        <section class="login">
            {{{ loginForm }}}
        <section>
    `;
  }
}

const LoginPageTemplate = new LoginPage({
  loginForm,
});

export default LoginPageTemplate;
