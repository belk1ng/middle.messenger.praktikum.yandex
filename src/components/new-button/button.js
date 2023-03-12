import Block from "../../core/Block";
import { renderDOM } from "../../utils/renderDOM";

class Button extends Block {
  constructor(props) {
    super("button", props);
  }

  render() {
    return "<div>{{text}}</div>";
  }
}

const button = new Button({
  text: "Click me",
  events: {
    click: () => {
      console.log("Button clicked");
    },
  },
});

renderDOM("#root", button);
